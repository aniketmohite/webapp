import React from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '@webapp/shared';
import { Button } from '@webapp/ui';

export function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          padding: '0 16px',
          minHeight: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontWeight: 700, fontSize: '18px', color: '#111827' }}>Webapp</span>
          <nav style={{ display: 'flex', gap: '16px' }}>
            <Link to="/" style={{ color: '#374151', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
            <Link to="/feed" style={{ color: '#374151', textDecoration: 'none', fontSize: '14px' }}>Feed</Link>
            {isAuthenticated && (
              <Link to="/profile" style={{ color: '#374151', textDecoration: 'none', fontSize: '14px' }}>Profile</Link>
            )}
          </nav>
        </div>
        <Button
          label={isAuthenticated ? 'Sign out' : 'Sign in'}
          onPress={handleAuthAction}
        />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
