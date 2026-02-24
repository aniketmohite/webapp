export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: '#000000',
  textSecondary: '#6B6B6B',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  border: '#C6C6C8',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type Colors = typeof colors;
