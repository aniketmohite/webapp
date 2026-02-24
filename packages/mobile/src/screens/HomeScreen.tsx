import { useAuth, usePosts } from '@webapp/shared';
import { Avatar, Card, Text } from '@webapp/ui';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

export function HomeScreen() {
  const { user } = useAuth();
  const { posts, isLoading } = usePosts();

  const featuredPosts = posts.slice(0, 3);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={featuredPosts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {/* Hero section */}
            <View style={styles.hero}>
              <Text variant="h2" style={styles.heroTitle}>
                Welcome back{user ? `, ${user.name.split(' ')[0]}` : ''}!
              </Text>
              <Text variant="body" color="#e0e7ff" style={styles.heroSubtitle}>
                Here's what's trending today.
              </Text>
            </View>

            {/* Featured label */}
            <View style={styles.section}>
              <Text variant="h3" style={styles.sectionTitle}>
                Featured Posts
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.postHeader}>
              <Avatar name={item.author.name} size={36} />
              <View style={styles.authorInfo}>
                <Text variant="label">{item.author.name}</Text>
                <Text variant="caption">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
            <Text variant="h3" style={styles.postTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text variant="body" color="#4b5563" numberOfLines={3}>
              {item.content}
            </Text>
          </Card>
        )}
        ListEmptyComponent={
          isLoading ? (
            <Text variant="body" color="#6b7280" style={styles.empty}>
              Loading posts…
            </Text>
          ) : (
            <Text variant="body" color="#6b7280" style={styles.empty}>
              No posts yet.
            </Text>
          )
        }
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  list: {
    paddingBottom: 24,
  },
  hero: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },
  heroTitle: {
    color: '#ffffff',
    marginBottom: 4,
  },
  heroSubtitle: {
    marginTop: 0,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    color: '#111827',
  },
  card: {
    marginHorizontal: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    marginLeft: 10,
    flex: 1,
  },
  postTitle: {
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
  },
});
