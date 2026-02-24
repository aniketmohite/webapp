import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@webapp/shared';
import { Card, TextInput, Button } from '@webapp/ui';

export function RegisterPage() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register({ name, email, password });
      navigate('/feed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
            style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 4px' }}
          >
            Create account
          </h1>
          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              marginBottom: '24px',
            }}
          >
            Join the community today.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="Jane Doe"
              autoCapitalize="words"
            />
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
              label={isLoading ? 'Creating account…' : 'Create account'}
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
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#6366f1' }}>
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
