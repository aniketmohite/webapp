import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts, greeting } from '@webapp/shared';
import { Card, Button } from '@webapp/ui';

export function HomePage() {
  const { posts, isLoading } = usePosts();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
        {greeting('there')}
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>
        Discover the latest posts from our community.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '40px',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/feed" style={{ textDecoration: 'none' }}>
          <Button label="Browse Feed" onPress={() => {}} />
        </Link>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button label="Get Started" onPress={() => {}} />
        </Link>
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
        Featured Posts
      </h2>

      {isLoading ? (
        <p style={{ color: '#9ca3af' }}>Loading posts…</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.slice(0, 3).map((post) => (
            <Card key={post.id}>
              <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600 }}>
                {post.title}
              </h3>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                {post.content}
              </p>
              <p
                style={{
                  margin: '8px 0 0',
                  fontSize: '12px',
                  color: '#9ca3af',
                }}
              >
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
