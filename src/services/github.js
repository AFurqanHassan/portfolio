const MOCK_DATA = {
  username: "GitHubUser",
  projects: [
    {
      id: 1,
      name: "Nexus-Engine",
      description: "A high-performance procedural geometry engine built with WebGL and TypeScript.",
      url: "#",
      homepage: "#",
      stars: 1240,
      topics: ["webgl", "graphics", "procedural"],
      languages: ["TypeScript", "GLSL", "HTML"],
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Aether-UI",
      description: "A glassmorphic design system for modern React applications with immersive animations.",
      url: "#",
      homepage: "#",
      stars: 850,
      topics: ["react", "design-system", "animations"],
      languages: ["JavaScript", "CSS", "React"],
      updatedAt: new Date().toISOString()
    }
  ],
  skills: ["React", "TypeScript", "Three.js", "Python", "GLSL", "Node.js", "TailwindCSS"],
  totalRepos: 42,
  isMock: true,
  name: "Your Name",
  avatar: "https://github.com/github.png",
  bio: "Full-stack architect crafting digital experiences that blend complex geometry with seamless user interaction."
};

/**
 * Automatically detects the GitHub username.
 * 1. Checks for ?user=USERNAME query param.
 * 2. Checks for owner.github.io hostname.
 * 3. Falls back to a specific user (change this when forking!).
 */
export const getGitHubUsername = async () => {
  const hostname = window.location.hostname;
  const searchParams = new URLSearchParams(window.location.search);
  
  if (searchParams.get('demo') === 'true') return 'demo';

  const forcedUser = searchParams.get('user');
  if (forcedUser) return forcedUser;

  if (hostname.endsWith('.github.io')) {
    return hostname.split('.')[0];
  }

  // Default fallback - change this to YOUR username if forking
  return 'AFurqanHassan'; 
};

export const fetchGitHubData = async (username) => {
  if (username === 'demo') return MOCK_DATA;

  const CACHE_KEY = `gh_data_${username}`;
  const CACHE_TIME = 1000 * 60 * 30;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TIME) return data;
    }
  } catch {
    // Ignore cache access errors
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const userData = userRes.ok ? await userRes.json() : { name: username, bio: "" };

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!reposResponse.ok) throw new Error("API Error");

    const repos = await reposResponse.json();
    const portfolioProjects = repos.filter(repo => repo.homepage && repo.homepage.includes(`${username}.github.io`) || repo.has_pages);
    const displayedProjects = portfolioProjects.length > 0 ? portfolioProjects : repos.slice(0, 6);

    const projectsWithLangs = await Promise.all(displayedProjects.map(async (repo) => {
      try {
        const langResponse = await fetch(repo.languages_url);
        const languages = langResponse.ok ? await langResponse.json() : {};
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          homepage: repo.homepage || `https://${username}.github.io/${repo.name}`,
          stars: repo.stargazers_count,
          topics: repo.topics || [],
          languages: Object.keys(languages),
          languageData: languages,
          updatedAt: repo.updated_at
        };
      } catch {
        return { id: repo.id, name: repo.name, description: repo.description, url: repo.html_url, stars: repo.stargazers_count, languages: [] };
      }
    }));

    const allLanguages = {};
    repos.forEach(repo => { if (repo.language) allLanguages[repo.language] = (allLanguages[repo.language] || 0) + 1; });

    const topSkills = Object.entries(allLanguages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name]) => name);

    const result = {
      username,
      name: userData.name || username,
      rawBio: userData.bio || "",
      avatar: userData.avatar_url || `https://github.com/${username}.png`,
      projects: projectsWithLangs,
      skills: topSkills,
      totalRepos: repos.length
    };

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: result, timestamp: Date.now() }));
    } catch {
      // Ignore storage errors
    }

    return result;
  } catch {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached).data;
    } catch {
      // Ignore cache retrieval errors
    }
    return { ...MOCK_DATA, isFallback: true, username };
  }
};

export const generateTagline = (data) => {
  if (!data || !data.skills.length) return "Innovating digital experiences";
  return `Building the future with ${data.skills.slice(0, 3).join(', ')}`;
};

export const generateBioSummary = (data) => {
  if (!data) return "";
  const topSkills = data.skills.slice(0, 5).join(', ');
  const name = data.name || data.username;
  return `As ${name} (@${data.username}), I have curated a journey through ${data.totalRepos} public repositories, refining a specialized expertise in ${topSkills}. My technical path is defined by a focused commitment to ${data.skills[0] || 'innovative engineering'} and a drive to build scalable, impactful systems. ${data.rawBio || ""}`;
};
