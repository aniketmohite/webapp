import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@webapp/shared';
import { Header, Button } from '@webapp/ui';

export function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Feed', href: '/feed' },
    ...(isAuthenticated ? [{ label: 'Profile', href: '/profile' }] : []),
  ];

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header
        title="Webapp"
        links={navLinks}
        actions={
          <Button
            label={isAuthenticated ? 'Sign out' : 'Sign in'}
            onPress={handleAuthAction}
          />
        }
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
