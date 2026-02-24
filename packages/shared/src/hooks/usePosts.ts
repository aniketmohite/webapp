import { useCallback, useEffect, useState } from 'react';
import type { Post } from '../types';

interface UsePostsResult {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  refresh: () => Promise<void>;
}

// Mock posts — replace with real API calls in production
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React Native',
    content:
      'React Native lets you build mobile apps using JavaScript and React. Learn how to set up your environment and build your first app.',
    author: { id: '1', name: 'Alice Smith', email: 'alice@example.com' },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Building a Monorepo with pnpm',
    content:
      `pnpm workspaces make it easy to manage multiple packages in a single repository. Here's how to set it up for a full-stack project.`,
    author: { id: '2', name: 'Bob Jones', email: 'bob@example.com' },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: `Expo SDK 52: What's New`,
    content:
      `Expo SDK 52 ships with React Native 0.76, New Architecture by default, and a host of new APIs. Let's explore the highlights.`,
    author: { id: '1', name: 'Alice Smith', email: 'alice@example.com' },
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'React Navigation v6 Deep Dive',
    content:
      `React Navigation v6 brings a simpler API, better TypeScript support, and improved performance. Here's everything you need to know.`,
    author: { id: '3', name: 'Carol White', email: 'carol@example.com' },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: '5',
    title: 'TypeScript Best Practices for React',
    content:
      `Strong typing in React projects reduces bugs and improves developer experience. Here are the patterns we've found most valuable.`,
    author: { id: '2', name: 'Bob Jones', email: 'bob@example.com' },
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

export function usePosts(): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call — replace with real endpoint
      await new Promise((resolve) => setTimeout(resolve, 600));
      setPosts(MOCK_POSTS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, error, fetchPosts, refresh: fetchPosts };
}
