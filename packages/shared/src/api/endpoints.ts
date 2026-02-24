import { apiGet, apiPost } from './apiClient';
import type { User, Post } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const getUser = (id: string): Promise<User> => apiGet<User>(`/users/${id}`);

export const getPosts = (): Promise<Post[]> => apiGet<Post[]>('/posts');

export const login = (credentials: LoginCredentials): Promise<AuthResponse> =>
  apiPost<AuthResponse>('/auth/login', credentials);

export const register = (data: RegisterData): Promise<AuthResponse> =>
  apiPost<AuthResponse>('/auth/register', data);
