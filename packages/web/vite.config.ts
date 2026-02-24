import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '@webapp/shared': path.resolve(__dirname, '../shared/src/index.ts'),
      '@webapp/ui': path.resolve(__dirname, '../ui/src/index.ts'),
    },
  },
  server: {
    port: 5173,
  },
});
