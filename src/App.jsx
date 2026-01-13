import React from 'react';
import { useGitHubData } from './hooks/useGitHubData';
import BackgroundScene from './components/canvas/Background';
import Hero from './components/Hero';
import ProjectList from './components/ProjectList';
import Skills from './components/Skills';

function App() {
  const { data, loading, error } = useGitHubData();
  console.log('Portfolio State:', { data, loading, error });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
          Initializing Portfolio System...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 glass-card p-8">
          Error: {error}. Please try again later or check your network.
        </div>
      </div>
    );
  }

  return (
    <div className="relative text-white selection:bg-purple-500/30">
      <BackgroundScene />
      
      <main>
        {window.location.hostname === 'localhost' && !data.isMock && data.username === 'AFurqanHassan' && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 glass-card border-yellow-500/50 text-yellow-200 text-sm animate-bounce shadow-2xl">
            💡 Local Dev: Use <code className="text-white">?user=YOUR_USERNAME</code> to see your own data!
          </div>
        )}

        {data.isMock && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 glass-card border-purple-500/50 text-purple-200 text-sm animate-pulse shadow-2xl">
            ✨ {data.isRateLimited ? "GitHub API Limited - Viewing Demo Mode" : "Demo Mode Active"}
          </div>
        )}

        <Hero 
          username={data.username} 
          name={data.name} 
          tagline={data.tagline} 
          bio={data.bio} 
          avatar={data.avatar}
        />
        <ProjectList projects={data.projects} />
        <Skills skills={data.skills} />
      </main>

      <footer className="py-12 px-6 text-center text-gray-500 text-sm border-t border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {data.username}. Built with Automation.</p>
          <div className="flex gap-6">
            <a href={`https://github.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub Profile</a>
            <a href="https://github.com/google/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Fork This Source</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
