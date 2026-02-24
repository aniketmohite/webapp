import React from 'react';

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  title: string;
  links?: NavLink[];
  actions?: React.ReactNode;
}

export function Header({ title, links = [], actions }: HeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '56px',
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: '18px',
          color: '#111827',
          textDecoration: 'none',
        }}
      >
        {title}
      </span>

      {links.length > 0 && (
        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: '6px 12px',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      {actions && <div style={{ display: 'flex', gap: '8px' }}>{actions}</div>}
    </header>
  );
}
