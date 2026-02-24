// @webapp/shared - business logic, types, API client

export const APP_NAME = 'Webapp';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  authorId: string;
  createdAt: string;
}

export function greeting(name: string): string {
  return `Hello, ${name}! Welcome to ${APP_NAME}.`;
}

export { useApi } from './hooks/useApi';
export { useAuth } from './hooks/useAuth';
export { usePosts } from './hooks/usePosts';
