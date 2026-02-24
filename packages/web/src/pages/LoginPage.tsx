import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@webapp/shared';
import { Card, TextInput, Button } from '@webapp/ui';

export function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/feed');
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: '#f9fafb',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Card>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              marginBottom: '4px',
              margin: '0 0 4px',
            }}
          >
            Sign in
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            Welcome back! Enter your credentials to continue.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <TextInput
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
            />
            <TextInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
            />

            {error && (
              <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>
                {error}
              </p>
            )}

            <Button
              label={loading ? 'Signing in…' : 'Sign in'}
              onPress={() => {}}
            />
          </form>

          <p
            style={{
              marginTop: '16px',
              fontSize: '14px',
              color: '#6b7280',
              textAlign: 'center',
            }}
          >
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#6366f1' }}>
              Register
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
