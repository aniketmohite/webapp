import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import type { AuthActions, AuthState, User } from '../types';

type AuthContextValue = AuthState & AuthActions;

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

// Mock user store (replace with real API calls in production)
const MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', createdAt: '2024-01-01T00:00:00Z' },
];

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      // Mock API call — replace with real auth endpoint
      await new Promise((resolve) => setTimeout(resolve, 800));
      const found = MOCK_USERS.find((u) => u.email === credentials.email);
      const mockToken = 'mock-token-' + Date.now();
      if (found) {
        setUser(found);
        setToken(mockToken);
      } else {
        // Create a mock user for demonstration
        const newUser: User = {
          id: Date.now().toString(),
          name: credentials.email.split('@')[0],
          email: credentials.email,
          createdAt: new Date().toISOString(),
        };
        setUser(newUser);
        setToken(mockToken);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const register = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      setIsLoading(true);
      try {
        // Mock API call — replace with real registration endpoint
        await new Promise((resolve) => setTimeout(resolve, 800));
        const newUser: User = {
          id: Date.now().toString(),
          name: data.name,
          email: data.email,
          createdAt: new Date().toISOString(),
        };
        const mockToken = 'mock-token-' + Date.now();
        setUser(newUser);
        setToken(mockToken);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, isAuthenticated: user !== null, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
