import { useState, useEffect } from 'react';
import { getGitHubUsername, fetchGitHubData, generateTagline, generateBioSummary } from '../services/github';

export const useGitHubData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const username = await getGitHubUsername();
        const gitHubData = await fetchGitHubData(username);
        
        setData({
          ...gitHubData,
          tagline: generateTagline(gitHubData),
          bio: generateBioSummary(gitHubData)
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};
