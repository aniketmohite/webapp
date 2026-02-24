import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

export interface HeaderAction {
  label: string;
  onPress: () => void;
}

export interface HeaderProps {
  title: string;
  leftAction?: HeaderAction;
  rightAction?: HeaderAction;
}

export function Header({ title, leftAction, rightAction }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {leftAction ? (
          <Pressable onPress={leftAction.onPress} style={styles.action}>
            <Text style={styles.actionText}>{leftAction.label}</Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.rightSide]}>
        {rightAction ? (
          <Pressable onPress={rightAction.onPress} style={styles.action}>
            <Text style={styles.actionText}>{rightAction.label}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minHeight: 56,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  side: {
    width: 80,
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  action: {
    padding: spacing.xs,
  },
  actionText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
  },
});
