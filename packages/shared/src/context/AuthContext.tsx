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
  { id: '1', name: 'Alice Smith', email: 'alice@example.com' },
];

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Mock API call — replace with real auth endpoint
      await new Promise((resolve) => setTimeout(resolve, 800));
      const found = MOCK_USERS.find((u) => u.email === email);
      if (found) {
        setUser(found);
      } else {
        // Create a mock user for demonstration
        setUser({ id: Date.now().toString(), name: email.split('@')[0], email });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      setIsLoading(true);
      try {
        // Mock API call — replace with real registration endpoint
        await new Promise((resolve) => setTimeout(resolve, 800));
        const newUser: User = { id: Date.now().toString(), name, email };
        setUser(newUser);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: user !== null, login, logout, register }}
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
