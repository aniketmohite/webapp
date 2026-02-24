import React from 'react';
import { usePosts, useAuth } from '@webapp/shared';
import { Card, Avatar, Button } from '@webapp/ui';

export function FeedPage() {
  const { posts, loading, error, refresh } = usePosts();
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Feed</h1>
        <Button label="Refresh" onPress={refresh} />
      </div>

      {loading && (
        <p style={{ color: '#9ca3af', textAlign: 'center', padding: '32px 0' }}>
          Loading posts…
        </p>
      )}

      {error && (
        <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>
      )}

      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map((post) => (
            <Card key={post.id}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px',
                }}
              >
                <Avatar
                  name={
                    post.authorId === 'system'
                      ? 'Webapp Team'
                      : user?.name ?? 'User'
                  }
                  size={32}
                />
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#374151',
                    }}
                  >
                    {post.authorId === 'system' ? 'Webapp Team' : user?.name}
                  </p>
                  <p
                    style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}
                  >
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#111827',
                }}
              >
                {post.title}
              </h2>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                {post.body}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
