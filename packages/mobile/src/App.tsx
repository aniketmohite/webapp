import { AuthProvider } from '@webapp/shared';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppNavigator } from './navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </AuthProvider>
  );
}
