import { StyleSheet, Text, View } from 'react-native';
import { greeting } from '@webapp/shared';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{greeting('World')}</Text>
      <Text>Built with Expo + React Native in a pnpm monorepo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
