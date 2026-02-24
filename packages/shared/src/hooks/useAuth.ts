import { useState, useCallback } from 'react';
import type { User } from '../index';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UseAuthReturn extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AUTH_KEY = 'webapp_auth_user';

function loadStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>(() => {
    const stored = loadStoredUser();
    return {
      user: stored,
      isAuthenticated: stored !== null,
      loading: false,
      error: null,
    };
  });

  const login = useCallback(
    async (email: string, _password: string): Promise<boolean> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      // Simulate async auth (replace with real API call)
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!email) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Email is required',
        }));
        return false;
      }

      const user: User = {
        id: Math.random().toString(36).slice(2),
        name: email.split('@')[0],
        email,
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      setState({ user, isAuthenticated: true, loading: false, error: null });
      return true;
    },
    []
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      _password: string
    ): Promise<boolean> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!name || !email) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Name and email are required',
        }));
        return false;
      }

      const user: User = {
        id: Math.random().toString(36).slice(2),
        name,
        email,
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      setState({ user, isAuthenticated: true, loading: false, error: null });
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setState({ user: null, isAuthenticated: false, loading: false, error: null });
  }, []);

  return { ...state, login, register, logout };
}
