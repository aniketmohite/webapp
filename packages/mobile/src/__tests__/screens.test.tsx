import React from 'react';
import { render, screen } from '@testing-library/react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore, usePostsStore } from '@webapp/shared';

import { HomeScreen } from '../screens/HomeScreen';
import { FeedScreen } from '../screens/FeedScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import type { AuthStackParamList } from '../navigation/AuthNavigator';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
  push: jest.fn(),
} as unknown as NativeStackNavigationProp<AuthStackParamList>;

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

beforeEach(() => {
  useAuthStore.setState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  });
  usePostsStore.setState({
    posts: [],
    isLoading: false,
    error: null,
  });
  jest.clearAllMocks();
});

// ─── HomeScreen ────────────────────────────────────────────────────────────

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    render(<HomeScreen />);
  });

  it('shows welcome message', () => {
    render(<HomeScreen />);
    expect(screen.getByText(/Welcome back/i)).toBeTruthy();
  });

  it('shows featured posts section', () => {
    render(<HomeScreen />);
    expect(screen.getByText(/Featured Posts/i)).toBeTruthy();
  });

  it('shows user name when authenticated', () => {
    useAuthStore.setState({
      user: { id: '1', name: 'Alice Smith', email: 'alice@example.com', createdAt: '2024-01-01' },
      token: 'tok',
      isAuthenticated: true,
      isLoading: false,
    });
    render(<HomeScreen />);
    expect(screen.getByText(/Alice/i)).toBeTruthy();
  });
});

// ─── FeedScreen ────────────────────────────────────────────────────────────

describe('FeedScreen', () => {
  it('renders without crashing', () => {
    render(<FeedScreen />);
  });

  it('shows Latest Posts heading', () => {
    render(<FeedScreen />);
    expect(screen.getByText(/Latest Posts/i)).toBeTruthy();
  });

  it('shows post count', () => {
    render(<FeedScreen />);
    expect(screen.getByText(/0 posts/i)).toBeTruthy();
  });

  it('renders posts when available', () => {
    usePostsStore.setState({
      posts: [
        {
          id: 'p1',
          title: 'Test Post',
          content: 'Test content',
          author: { id: 'u1', name: 'Alice', email: 'alice@example.com', createdAt: '2024-01-01' },
          createdAt: '2024-01-02T00:00:00Z',
          likes: 0,
        },
      ],
      isLoading: false,
      error: null,
    });
    render(<FeedScreen />);
    expect(screen.getByText('Test Post')).toBeTruthy();
  });
});

// ─── LoginScreen ───────────────────────────────────────────────────────────

describe('LoginScreen', () => {
  it('renders without crashing', () => {
    render(<LoginScreen navigation={mockNavigation} />);
  });

  it('shows Welcome back heading', () => {
    render(<LoginScreen navigation={mockNavigation} />);
    expect(screen.getByText(/Welcome back/i)).toBeTruthy();
  });

  it('shows Sign In button', () => {
    render(<LoginScreen navigation={mockNavigation} />);
    expect(screen.getByText('Sign In')).toBeTruthy();
  });

  it('shows Create one link', () => {
    render(<LoginScreen navigation={mockNavigation} />);
    expect(screen.getByText(/Create one/i)).toBeTruthy();
  });
});

// ─── RegisterScreen ────────────────────────────────────────────────────────

describe('RegisterScreen', () => {
  it('renders without crashing', () => {
    render(<RegisterScreen navigation={mockNavigation} />);
  });

  it('shows Create account heading', () => {
    render(<RegisterScreen navigation={mockNavigation} />);
    expect(screen.getAllByText(/Create account/i).length).toBeGreaterThan(0);
  });

  it('shows Create Account button', () => {
    render(<RegisterScreen navigation={mockNavigation} />);
    expect(screen.getByText('Create Account')).toBeTruthy();
  });

  it('shows Sign in link', () => {
    render(<RegisterScreen navigation={mockNavigation} />);
    expect(screen.getByText(/Sign in/i)).toBeTruthy();
  });
});

// ─── ProfileScreen ─────────────────────────────────────────────────────────

describe('ProfileScreen', () => {
  it('renders null when user is not authenticated', () => {
    const { toJSON } = render(<ProfileScreen />);
    expect(toJSON()).toBeNull();
  });

  it('renders profile when user is set', () => {
    useAuthStore.setState({
      user: { id: '1', name: 'Alice Smith', email: 'alice@example.com', createdAt: '2024-01-01' },
      token: 'tok',
      isAuthenticated: true,
      isLoading: false,
    });
    render(<ProfileScreen />);
    expect(screen.getAllByText('Alice Smith').length).toBeGreaterThan(0);
  });

  it('shows Account Details card when authenticated', () => {
    useAuthStore.setState({
      user: { id: '1', name: 'Alice Smith', email: 'alice@example.com', createdAt: '2024-01-01' },
      token: 'tok',
      isAuthenticated: true,
      isLoading: false,
    });
    render(<ProfileScreen />);
    expect(screen.getByText('Account Details')).toBeTruthy();
  });

  it('shows Sign Out button', () => {
    useAuthStore.setState({
      user: { id: '1', name: 'Alice Smith', email: 'alice@example.com', createdAt: '2024-01-01' },
      token: 'tok',
      isAuthenticated: true,
      isLoading: false,
    });
    render(<ProfileScreen />);
    expect(screen.getByText('Sign Out')).toBeTruthy();
  });
});

// ─── Navigation flow ───────────────────────────────────────────────────────

describe('Navigation flows', () => {
  it('LoginScreen has link to navigate to Register', () => {
    render(<LoginScreen navigation={mockNavigation} />);
    expect(screen.getByText(/Create one/i)).toBeTruthy();
  });

  it('RegisterScreen has link to navigate to Login', () => {
    render(<RegisterScreen navigation={mockNavigation} />);
    expect(screen.getByText(/Sign in/i)).toBeTruthy();
  });
});
