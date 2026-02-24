import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@webapp/shared';
import { Card, Avatar, Button } from '@webapp/ui';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
        Profile
      </h1>

      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <Avatar name={user.name} size={64} />
          <div>
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: '18px',
                color: '#111827',
              }}
            >
              {user.name}
            </p>
            <p style={{ margin: '2px 0 0', color: '#6b7280', fontSize: '14px' }}>
              {user.email}
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>User ID</span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#374151',
              }}
            >
              {user.id}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Email</span>
            <span style={{ fontSize: '14px', color: '#374151' }}>
              {user.email}
            </span>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <Button label="Sign out" onPress={handleLogout} />
        </div>
      </Card>
    </div>
  );
}
