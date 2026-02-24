import React from 'react';
import { Text as RNText, TextStyle, StyleProp, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'caption';

export interface TextProps {
  variant?: TextVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, TextStyle> = {
  h1: { fontSize: typography.fontSize.xxl, fontWeight: typography.fontWeight.bold, color: colors.text },
  h2: { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, color: colors.text },
  h3: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, color: colors.text },
  body: { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.regular, color: colors.text },
  label: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.text },
  caption: { fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.regular, color: colors.textSecondary },
};

export function Text({ variant = 'body', color, style, numberOfLines, onPress, children }: TextProps) {
  return (
    <RNText
      style={[styles.base, variantStyles[variant], color ? { color } : null, style]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    lineHeight: typography.lineHeight.md,
  },
});
