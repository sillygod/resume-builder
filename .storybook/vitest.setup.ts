import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/addon-vitest/setup';
import * as projectAnnotations from './preview.js';

// Apply Storybook's project annotations (decorators, parameters, etc.) to Vitest
beforeAll(() => {
  setProjectAnnotations([projectAnnotations]);
});