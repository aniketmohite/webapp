import { useCallback } from 'react';
import { usePostsStore } from '../state/postsStore';
import { getPosts as getPostsApi } from '../api/endpoints';
import { apiPost } from '../api/apiClient';
import type { Post } from '../types';

export const usePosts = () => {
  const { posts, isLoading, error, setPosts, addPost, likePost, setLoading, setError } =
    usePostsStore();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPostsApi();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, [setPosts, setLoading, setError]);

  const createPost = useCallback(
    async (payload: { title: string; content: string }) => {
      setLoading(true);
      setError(null);
      try {
        const newPost = await apiPost<Post>('/posts', payload);
        addPost(newPost);
        return newPost;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create post');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addPost, setLoading, setError],
  );

  const handleLikePost = useCallback(
    async (postId: string) => {
      likePost(postId);
      try {
        await apiPost<void>(`/posts/${postId}/like`, {});
      } catch (err) {
        likePost(postId);
        throw err;
      }
    },
    [likePost],
  );

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    refresh: fetchPosts,
    createPost,
    likePost: handleLikePost,
  };
};
