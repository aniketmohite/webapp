// Types
export type { User, Post, AuthState, ApiResponse } from './types';

// API Client
export { apiGet, apiPost, setAuthToken, configureApi, ApiError } from './api/apiClient';
export { getUser, getPosts, login, register } from './api/endpoints';
export type { LoginCredentials, RegisterData, AuthResponse } from './api/endpoints';

// State
export { useAuthStore } from './state/authStore';
export type { AuthStore } from './state/authStore';
export { usePostsStore } from './state/postsStore';
export type { PostsStore } from './state/postsStore';
export { configureStorage } from './state/storage';
export type { PlatformStorage } from './state/storage';

// Hooks
export { useAuth } from './hooks/useAuth';
export { useApi } from './hooks/useApi';
export { usePosts } from './hooks/usePosts';

// Context
export { AuthProvider } from './context/AuthContext';

// Utilities
export const greeting = (name: string): string => `Hello, ${name}!`;
