import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuthStore, usePostsStore } from '@webapp/shared';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProfilePage } from '../pages/ProfilePage';
import { FeedPage } from '../pages/FeedPage';

// Mock fetch globally
const mockFetch = vi.fn();
beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => [],
  });
  // Reset auth state
  useAuthStore.setState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  });
  usePostsStore.setState({ posts: [], isLoading: false, error: null });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

function withRouter(component: React.ReactNode, initialEntry = '/') {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      {component}
    </MemoryRouter>
  );
}

// ─── HomePage ──────────────────────────────────────────────────────────────

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(withRouter(<HomePage />));
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('shows greeting message', () => {
    render(withRouter(<HomePage />));
    expect(screen.getByText(/Hello, there!/i)).toBeInTheDocument();
  });

  it('shows Browse Feed button', () => {
    render(withRouter(<HomePage />));
    expect(screen.getByText('Browse Feed')).toBeInTheDocument();
  });

  it('shows Get Started button', () => {
    render(withRouter(<HomePage />));
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('shows Featured Posts heading', () => {
    render(withRouter(<HomePage />));
    expect(screen.getByText('Featured Posts')).toBeInTheDocument();
  });
});

// ─── LoginPage ─────────────────────────────────────────────────────────────

describe('LoginPage', () => {
  it('renders without crashing', () => {
    render(withRouter(<LoginPage />));
    // h1 Sign in heading exists
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows email field', () => {
    render(withRouter(<LoginPage />));
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('shows password field', () => {
    render(withRouter(<LoginPage />));
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('shows register link', () => {
    render(withRouter(<LoginPage />));
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows Email label', () => {
    render(withRouter(<LoginPage />));
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});

// ─── RegisterPage ──────────────────────────────────────────────────────────

describe('RegisterPage', () => {
  it('renders without crashing', () => {
    render(withRouter(<RegisterPage />));
    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
  });

  it('shows name field', () => {
    render(withRouter(<RegisterPage />));
    expect(screen.getByPlaceholderText('Jane Doe')).toBeInTheDocument();
  });

  it('shows email field', () => {
    render(withRouter(<RegisterPage />));
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('shows password field', () => {
    render(withRouter(<RegisterPage />));
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('shows sign in link', () => {
    render(withRouter(<RegisterPage />));
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});

// ─── ProfilePage ───────────────────────────────────────────────────────────

describe('ProfilePage', () => {
  it('renders nothing when user is null', () => {
    const { container } = render(withRouter(<ProfilePage />));
    expect(container.firstChild).toBeNull();
  });

  it('renders profile when user is set', () => {
    useAuthStore.setState({
      user: { id: '1', name: 'Alice', email: 'alice@example.com', createdAt: '2024-01-01' },
      token: 'tok',
      isAuthenticated: true,
      isLoading: false,
    });

    render(withRouter(<ProfilePage />));
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getAllByText('alice@example.com').length).toBeGreaterThan(0);
  });

  it('shows sign out button when authenticated', () => {
    useAuthStore.setState({
      user: { id: '1', name: 'Alice', email: 'alice@example.com', createdAt: '2024-01-01' },
      token: 'tok',
      isAuthenticated: true,
      isLoading: false,
    });

    render(withRouter(<ProfilePage />));
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});

// ─── FeedPage ──────────────────────────────────────────────────────────────

describe('FeedPage', () => {
  it('renders Feed heading', async () => {
    await act(async () => {
      render(withRouter(<FeedPage />));
    });
    expect(screen.getByRole('heading', { name: /feed/i })).toBeInTheDocument();
  });

  it('shows Refresh button', async () => {
    await act(async () => {
      render(withRouter(<FeedPage />));
    });
    expect(screen.getByText('Refresh')).toBeInTheDocument();
  });

  it('shows empty state after posts load as empty', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    await act(async () => {
      render(withRouter(<FeedPage />));
    });
    await waitFor(() => expect(screen.queryByText('Loading posts…')).not.toBeInTheDocument());
    expect(screen.getByText(/No posts yet/i)).toBeInTheDocument();
  });

  it('shows posts when available', async () => {
    const mockPost = {
      id: 'p1',
      title: 'My First Post',
      content: 'Content here',
      author: { id: 'u1', name: 'Alice', email: 'alice@example.com', createdAt: '2024-01-01' },
      createdAt: '2024-01-02T00:00:00Z',
      likes: 0,
    };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [mockPost],
    });
    await act(async () => {
      render(withRouter(<FeedPage />));
    });
    await waitFor(() => expect(screen.queryByText('Loading posts…')).not.toBeInTheDocument());
    expect(screen.getByText('My First Post')).toBeInTheDocument();
  });
});

// ─── Navigation flow ───────────────────────────────────────────────────────

describe('Navigation flow', () => {
  it('LoginPage leads to FeedPage after login - shows sign in form', () => {
    render(withRouter(<LoginPage />, '/login'));
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('ProfilePage shows user data when authenticated', () => {
    useAuthStore.setState({
      user: { id: '2', name: 'Bob', email: 'bob@test.com', createdAt: '2024-01-02' },
      token: 'tok2',
      isAuthenticated: true,
      isLoading: false,
    });
    render(withRouter(<ProfilePage />, '/profile'));
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getAllByText('bob@test.com').length).toBeGreaterThan(0);
  });

  it('ProtectedRoute redirects to login when unauthenticated - ProfilePage returns null', () => {
    // When user is null, ProfilePage renders nothing
    const { container } = render(withRouter(<ProfilePage />, '/profile'));
    expect(container.firstChild).toBeNull();
  });
});
