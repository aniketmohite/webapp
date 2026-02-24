import { usePosts } from '@webapp/shared';
import { Avatar, Card, Text } from '@webapp/ui';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

export function FeedScreen() {
  const { posts, isLoading, error, refresh } = usePosts();

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text variant="body" color="#ef4444" style={styles.errorText}>
            {error}
          </Text>
          <Text variant="label" color="#2563eb" onPress={refresh}>
            Try again
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            {/* Post header */}
            <View style={styles.postHeader}>
              <Avatar name={item.author.name} size={40} />
              <View style={styles.authorInfo}>
                <Text variant="label">{item.author.name}</Text>
                <Text variant="caption">
                  {new Date(item.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            {/* Post content */}
            <Text variant="h3" style={styles.postTitle}>
              {item.title}
            </Text>
            <Text variant="body" color="#4b5563" numberOfLines={4}>
              {item.content}
            </Text>
          </Card>
        )}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text variant="h2">Latest Posts</Text>
            <Text variant="body" color="#6b7280">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </Text>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#2563eb" />
            </View>
          ) : (
            <View style={styles.center}>
              <Text variant="body" color="#6b7280">
                No posts available yet.
              </Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refresh}
            tintColor="#2563eb"
          />
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
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  listHeader: {
    paddingTop: 20,
    paddingBottom: 12,
  },
  card: {
    marginBottom: 12,
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  errorText: {
    marginBottom: 12,
    textAlign: 'center',
  },
});
