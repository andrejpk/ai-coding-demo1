import { GitRepository } from '@prisma/client';
import { useEffect, useState } from 'react';

export function useRepositories() {
  const [repositories, setRepositories] = useState<GitRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const response = await fetch('/api/repositories');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepositories(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepositories();
  }, []);

  const createRepository = async (data: Omit<GitRepository, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/repositories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create repository');
      const newRepo = await response.json();
      setRepositories(prev => [...prev, newRepo]);
      return newRepo;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create repository');
    }
  };

  return {
    repositories,
    isLoading,
    error,
    createRepository,
  };
} 