import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../state/authStore';
import { usePostsStore } from '../state/postsStore';
import type { User, Post } from '../types';

const mockUser: User = {
  id: '1',
  name: 'Alice',
  email: 'alice@example.com',
  createdAt: '2024-01-01T00:00:00Z',
};

const mockPost: Post = {
  id: 'p1',
  title: 'Hello World',
  content: 'First post',
  author: mockUser,
  createdAt: '2024-01-02T00:00:00Z',
  likes: 0,
};

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('starts with unauthenticated state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('login sets user, token, and isAuthenticated', () => {
    useAuthStore.getState().login(mockUser, 'token-123');

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe('token-123');
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('logout clears state', () => {
    useAuthStore.getState().login(mockUser, 'token-123');
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('setLoading updates loading state', () => {
    useAuthStore.getState().setLoading(true);
    expect(useAuthStore.getState().isLoading).toBe(true);

    useAuthStore.getState().setLoading(false);
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it('setUser updates user and isAuthenticated', () => {
    useAuthStore.getState().setUser(mockUser);
    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    useAuthStore.getState().setUser(null);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});

describe('postsStore', () => {
  beforeEach(() => {
    usePostsStore.setState({
      posts: [],
      isLoading: false,
      error: null,
    });
  });

  it('starts with empty posts', () => {
    const state = usePostsStore.getState();
    expect(state.posts).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('setPosts replaces posts', () => {
    usePostsStore.getState().setPosts([mockPost]);
    expect(usePostsStore.getState().posts).toEqual([mockPost]);
  });

  it('addPost prepends a new post', () => {
    const post2: Post = { ...mockPost, id: 'p2', title: 'Second' };
    usePostsStore.getState().setPosts([mockPost]);
    usePostsStore.getState().addPost(post2);

    const { posts } = usePostsStore.getState();
    expect(posts[0].id).toBe('p2');
    expect(posts[1].id).toBe('p1');
  });

  it('likePost increments likes', () => {
    usePostsStore.getState().setPosts([mockPost]);
    usePostsStore.getState().likePost('p1');

    expect(usePostsStore.getState().posts[0].likes).toBe(1);
  });

  it('likePost does not affect other posts', () => {
    const post2: Post = { ...mockPost, id: 'p2', likes: 5 };
    usePostsStore.getState().setPosts([mockPost, post2]);
    usePostsStore.getState().likePost('p1');

    const { posts } = usePostsStore.getState();
    expect(posts.find((p) => p.id === 'p1')!.likes).toBe(1);
    expect(posts.find((p) => p.id === 'p2')!.likes).toBe(5);
  });

  it('setError updates error', () => {
    usePostsStore.getState().setError('Something went wrong');
    expect(usePostsStore.getState().error).toBe('Something went wrong');

    usePostsStore.getState().setError(null);
    expect(usePostsStore.getState().error).toBeNull();
  });
});
