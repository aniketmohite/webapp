import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  type TextStyle,
} from 'react-native';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  onPress?: () => void;
}

export function Text({
  children,
  variant = 'body',
  color,
  style,
  numberOfLines,
  onPress,
}: TextProps) {
  return (
    <RNText
      style={[styles.base, styles[variant], color ? { color } : null, style]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: '#111827',
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    color: '#6b7280',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});
