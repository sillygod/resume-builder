import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/vitest';

// More info at: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    // See options at: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon#storybooktest
    storybookTest(),
  ],
  test: {
    // Make sure to adjust this pattern to match your stories files
    include: ['src/**/*.stories.?(m)[jt]s?(x)', 'tests/**/*.visual.test.ts'],
    // Use jsdom for React component testing
    environment: 'jsdom',
    setupFiles: ['./.storybook/vitest.setup.ts'],
    // Add globals for testing utilities
    globals: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});