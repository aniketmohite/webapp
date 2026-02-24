import { useAuth } from '@webapp/shared';
import { Avatar, Button, Card, Text } from '@webapp/ui';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

export function ProfileScreen() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((p: string) => p[0])
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar + name */}
        <View style={styles.heroSection}>
          <Avatar name={user.name} size={80} />
          <Text variant="h2" style={styles.name}>
            {user.name}
          </Text>
          <Text variant="body" color="#e0e7ff">
            {user.email}
          </Text>
        </View>

        {/* Account info card */}
        <Card style={styles.card}>
          <Text variant="h3" style={styles.cardTitle}>
            Account Details
          </Text>

          <View style={styles.row}>
            <Text variant="label" color="#6b7280" style={styles.rowLabel}>
              Full Name
            </Text>
            <Text variant="body">{user.name}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text variant="label" color="#6b7280" style={styles.rowLabel}>
              Email
            </Text>
            <Text variant="body">{user.email}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text variant="label" color="#6b7280" style={styles.rowLabel}>
              Initials
            </Text>
            <Text variant="body">{initials}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text variant="label" color="#6b7280" style={styles.rowLabel}>
              Member Since
            </Text>
            <Text variant="body">{new Date().toLocaleDateString()}</Text>
          </View>
        </Card>

        {/* Sign out */}
        <Button
          label="Sign Out"
          variant="outline"
          onPress={logout}
          style={styles.signOutBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    paddingBottom: 32,
  },
  heroSection: {
    backgroundColor: '#2563eb',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  name: {
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  card: {
    marginHorizontal: 16,
    marginTop: -24,
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
  row: {
    paddingVertical: 12,
  },
  rowLabel: {
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },
  signOutBtn: {
    marginHorizontal: 16,
  },
});
