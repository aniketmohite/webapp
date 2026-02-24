import { useState, useEffect } from 'react';
import type { Post } from '../index';

export interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Welcome to Webapp',
    body: 'This is the first post on our platform. We are excited to have you here!',
    authorId: 'system',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Getting Started with React',
    body: 'React is a powerful library for building user interfaces. Learn how to get started in this post.',
    authorId: 'system',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Monorepo Best Practices',
    body: 'Managing a monorepo with pnpm workspaces makes sharing code between apps simple and efficient.',
    authorId: 'system',
    createdAt: new Date().toISOString(),
  },
];

export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulate async fetch (replace with real API call)
    const timer = setTimeout(() => {
      setPosts(MOCK_POSTS);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [tick]);

  const refresh = () => setTick((t) => t + 1);

  return { posts, loading, error, refresh };
}
