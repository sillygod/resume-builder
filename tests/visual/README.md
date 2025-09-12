# Visual Testing Setup

This directory contains visual tests for the Storybook components using Playwright and the Storybook Vitest addon.

## Overview

The visual testing setup consists of two main approaches:

1. **Playwright Visual Tests** - Full browser visual testing with screenshot comparison
2. **Vitest + Storybook Integration** - Component-level testing with HTML snapshots

## Structure

```
tests/visual/
├── README.md                      # This file
├── button.visual.spec.ts          # Playwright visual tests for Button component
├── resume-preview.visual.spec.ts  # Playwright visual tests for Resume Preview
├── form-components.visual.spec.ts # Playwright visual tests for form components
└── storybook.visual.test.ts       # Vitest integration tests with Storybook
```

## Configuration Files

- `playwright.config.ts` - Playwright configuration for visual testing
- `vitest.config.storybook.ts` - Vitest configuration for Storybook integration
- `.storybook/vitest.setup.ts` - Setup file for Storybook + Vitest integration

## Available Scripts

### Visual Testing with Playwright

```bash
# Run all Playwright visual tests
npm run test:visual

# Run Playwright tests with UI mode for debugging
npm run test:visual:ui

# Run Playwright tests in debug mode
npm run test:visual:debug
```

### Storybook Integration Testing

```bash
# Run Vitest tests with Storybook integration
npm run test:storybook

# Run Storybook tests with UI mode
npm run test:storybook:ui
```

### Combined Testing

```bash
# Run all tests (unit, Storybook, and visual)
npm run test:all
```

## Features

### Playwright Visual Tests

- **Full Browser Testing**: Tests run in real browsers (Chromium, Firefox, Safari)
- **Screenshot Comparison**: Automatic visual regression testing
- **Responsive Testing**: Tests across different viewport sizes
- **Interaction Testing**: Tests hover, focus, and other interactive states
- **Theme Testing**: Tests light/dark modes and print layouts
- **Cross-Browser Compatibility**: Tests across multiple browsers

### Vitest + Storybook Integration

- **Story Composition**: Reuses existing Storybook stories for testing
- **HTML Snapshots**: Creates HTML snapshots for regression testing
- **Fast Execution**: Runs in Node.js environment for speed
- **Component Isolation**: Tests individual components in isolation
- **Interactive Stories**: Tests stories with play functions

## Test Types

### 1. Button Component Tests (`button.visual.spec.ts`)

- All button variants (default, destructive, outline, etc.)
- All button sizes (small, default, large, icon)
- Interactive states (hover, focus, disabled)
- Responsive behavior across viewports

### 2. Resume Preview Tests (`resume-preview.visual.spec.ts`)

- All resume themes (simple, modern, centered, sidebar, executive)
- Different data sets (minimal, executive, fresh graduate, etc.)
- Responsive layouts
- Print layout simulation
- Dark theme compatibility
- Theme showcase comparisons

### 3. Form Component Tests (`form-components.visual.spec.ts`)

- Input components
- Card components
- Form sections (personal info, work experience, education, skills)
- Form interaction states
- Responsive form layouts

### 4. Storybook Integration Tests (`storybook.visual.test.ts`)

- HTML snapshot testing for all major components
- Story composition testing
- Interactive story testing

## Adding New Visual Tests

### For Playwright Visual Tests

1. Create a new `.spec.ts` file in the `tests/visual/` directory
2. Use the following template:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Component Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Component renders correctly', async ({ page }) => {
    await page.goto('/?path=/story/component--story');
    await page.waitForSelector('[data-testid="root"]', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('[data-testid="root"]')).toHaveScreenshot('component.png');
  });
});
```

### For Vitest + Storybook Tests

1. Add tests to `storybook.visual.test.ts` or create a new test file
2. Import and compose stories:

```typescript
import { composeStories } from '@storybook/react';
import * as ComponentStories from '../../src/stories/Component.stories';

const { Default, Variant } = composeStories(ComponentStories);

test('Component renders correctly', () => {
  const { container } = render(<Default />);
  expect(container.firstChild).toMatchSnapshot('component.html');
});
```

## Best Practices

1. **Wait for Content**: Always wait for content to load before taking screenshots
2. **Consistent Selectors**: Use consistent selectors like `[data-testid="root"]`
3. **Viewport Testing**: Test across different viewport sizes for responsive components
4. **State Testing**: Test different component states (hover, focus, disabled)
5. **Full Page Capture**: Use `fullPage: true` for components that may scroll
6. **Descriptive Names**: Use descriptive names for screenshot files

## Troubleshooting

### Common Issues

1. **Timeout Errors**: Increase timeout values for slow-loading components
2. **Flaky Tests**: Add additional wait conditions for dynamic content
3. **Screenshot Differences**: Review generated screenshots in `test-results/` directory
4. **Browser Installation**: Run `npx playwright install` if browsers are missing

### Updating Screenshots

To update reference screenshots when intentional changes are made:

```bash
# Update all Playwright screenshots
npm run test:visual -- --update-snapshots

# Update specific test screenshots
npm run test:visual -- --update-snapshots button.visual.spec.ts
```

### Debug Mode

Use debug mode to step through tests and inspect elements:

```bash
npm run test:visual:debug
```

## CI/CD Integration

The tests are configured to run in CI environments:

- Screenshots are captured on failure
- Retries are enabled for flaky tests
- Parallel execution is disabled in CI for stability
- HTML reports are generated for easy debugging

## Dependencies

- `@playwright/test` - Playwright testing framework
- `playwright` - Playwright browser automation
- `@storybook/vitest` - Storybook Vitest integration
- `@storybook/react` - Storybook React utilities
- `@testing-library/react` - React testing utilities
- `vitest` - Testing framework