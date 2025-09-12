import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/vitest';
import * as projectAnnotations from './preview';

// Apply Storybook's project annotations (decorators, parameters, etc.) to Vitest
beforeAll(() => {
  setProjectAnnotations([projectAnnotations]);
});