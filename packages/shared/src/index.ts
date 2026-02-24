// @webapp/shared - business logic, types, API client, hooks

export const APP_NAME = 'Webapp';

export function greeting(name: string): string {
  return `Hello, ${name}! Welcome to ${APP_NAME}.`;
}

// Types
export type { User, Post, AuthState, AuthActions } from './types';

// Context & hooks
export { AuthProvider, useAuth } from './context/AuthContext';
export { usePosts } from './hooks/usePosts';
export { useApi } from './hooks/useApi';
export type { ApiClient } from './hooks/useApi';
