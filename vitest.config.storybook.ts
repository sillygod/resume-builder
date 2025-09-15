import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Simplified config for Storybook visual tests
export default defineConfig({
  plugins: [react()],
  test: {
    // Include the visual test files
    include: ['tests/**/*.visual.test.ts', 'tests/**/*.visual.test.tsx'],
    // Use jsdom for React component testing
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    // Add globals for testing utilities
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});