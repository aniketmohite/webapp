import React from 'react';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
}

export function Button({ label, onPress }: ButtonProps) {
  return (
    <button onClick={onPress} style={{ padding: '8px 16px', cursor: 'pointer' }}>
      {label}
    </button>
  );
}
