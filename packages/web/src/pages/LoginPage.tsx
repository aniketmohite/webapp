import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@webapp/shared';
import { Card, TextInput, Button } from '@webapp/ui';

export function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate('/feed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />

            {error && (
              <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>
                {error}
              </p>
            )}

            <Button
              label={isLoading ? 'Signing in…' : 'Sign in'}
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
            {"Don't have an account? "}
            <Link to="/register" style={{ color: '#6366f1' }}>
              Register
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
