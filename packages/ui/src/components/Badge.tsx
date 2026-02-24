import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '../theme';

export interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'error';
}

const variantContainerStyles = {
  success: { backgroundColor: '#D1FAE5' },
  warning: { backgroundColor: '#FEF3C7' },
  error: { backgroundColor: '#FEE2E2' },
} as const;

const variantTextStyles = {
  success: { color: '#065F46' },
  warning: { color: '#92400E' },
  error: { color: '#991B1B' },
} as const;

export function Badge({ text, variant = 'success' }: BadgeProps) {
  return (
    <View style={[styles.container, variantContainerStyles[variant]]}>
      <Text style={[styles.text, variantTextStyles[variant]]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
});
