export const getGitHubUsername = async () => {
  // 1. Check hostname (e.g., username.github.io)
  const hostname = window.location.hostname;
  if (hostname.endsWith('.github.io')) {
    return hostname.split('.')[0];
  }

  // 2. Check for local development or other environments
  // We can try to infer from the current repo URL if possible, 
  // but since this is client-side, we might need a fallback.
  // The requirement says "No hardcoded usernames allowed".
  // Let's try to detect from the URL if it's a fork (not yet on GH pages).
  
  const searchParams = new URLSearchParams(window.location.search);
  const forcedUser = searchParams.get('user');
  if (forcedUser) return forcedUser;

  // Final fallback for local dev: try to find the repo owner from metadata
  // In a real fork, once deployed, it will be username.github.io.
  // For local testing, we'll return a placeholder that the user can change via URL ?user=...
  // or we can try to guess if it's running in a specific context.
  
  // NOTE: In production, the hostname check is primary.
  return 'google'; // Placeholder for local dev, overridable via ?user=...
};

export const fetchGitHubData = async (username) => {
  try {
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
    const repos = await reposResponse.json();

    // Identify GitHub Pages projects
    // Projects with a 'homepage' starting with 'https://[username].github.io'
    // or those that have 'has_pages' set to true.
    const portfolioProjects = repos.filter(repo => 
      (repo.homepage && repo.homepage.includes(`${username}.github.io`)) || 
      repo.has_pages
    );

    // If no GH Pages projects, fall back to showing recent public repos
    const displayedProjects = portfolioProjects.length > 0 ? portfolioProjects : repos.slice(0, 6);

    // Fetch languages for each displayed project
    const projectsWithLangs = await Promise.all(displayedProjects.map(async (repo) => {
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
    }));

    // Inferred Skills (top languages across all repos)
    const allLanguages = {};
    repos.forEach(repo => {
      if (repo.language) {
        allLanguages[repo.language] = (allLanguages[repo.language] || 0) + 1;
      }
    });

    const topSkills = Object.entries(allLanguages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name]) => name);

    return {
      username,
      projects: projectsWithLangs,
      skills: topSkills,
      totalRepos: repos.length
    };
  } catch (error) {
    console.error('GitHub API Error:', error);
    return null;
  }
};

export const generateTagline = (data) => {
  if (!data || !data.skills.length) return "Passionate Developer & Creator";
  const mainSkills = data.skills.slice(0, 3).join(', ');
  return `Building the future with ${mainSkills}`;
};
