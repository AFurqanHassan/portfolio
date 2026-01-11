import { useState, useEffect } from 'react';
import { getGitHubUsername, fetchGitHubData, generateTagline } from '../services/github';

export const useGitHubData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const username = await getGitHubUsername();
        const gitHubData = await fetchGitHubData(username);
        
        if (gitHubData) {
          setData({
            ...gitHubData,
            tagline: generateTagline(gitHubData)
          });
        } else {
          setError('User not found or API limit reached');
        }
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
