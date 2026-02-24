import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@webapp/shared': path.resolve(__dirname, '../shared/src/index.ts'),
            '@webapp/ui': path.resolve(__dirname, '../ui/src/index.ts'),
        },
    },
});
//# sourceMappingURL=vite.config.js.map