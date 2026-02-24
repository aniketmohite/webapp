import { useCallback } from 'react';
import { useAuthStore } from '../state/authStore';
import { login as loginApi, register as registerApi } from '../api/endpoints';
import { setAuthToken } from '../api/apiClient';
import type { LoginCredentials, RegisterData } from '../api/endpoints';

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, login, logout, setLoading } =
    useAuthStore();

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      try {
        const { user: loggedInUser, token: authToken } = await loginApi(credentials);
        setAuthToken(authToken);
        login(loggedInUser, authToken);
      } finally {
        setLoading(false);
      }
    },
    [login, setLoading],
  );

  const handleRegister = useCallback(
    async (data: RegisterData) => {
      setLoading(true);
      try {
        const { user: newUser, token: authToken } = await registerApi(data);
        setAuthToken(authToken);
        login(newUser, authToken);
      } finally {
        setLoading(false);
      }
    },
    [login, setLoading],
  );

  const handleLogout = useCallback(() => {
    setAuthToken(null);
    logout();
  }, [logout]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
