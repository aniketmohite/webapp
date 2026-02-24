import React from 'react';

export interface TextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Text({ children, style }: TextProps) {
  return <span style={style}>{children}</span>;
}
