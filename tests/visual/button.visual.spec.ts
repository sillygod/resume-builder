import { test, expect } from '@playwright/test';

test.describe('Button Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Storybook
    await page.goto('/');
  });

  test('Button variants visual comparison', async ({ page }) => {
    // Navigate to All Variants story
    await page.goto('/?path=/story/ui-components-button--all-variants');
    
    // Wait for story to load
    await page.waitForSelector('#storybook-root', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Take screenshot of all button variants
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-all-variants.png');
  });

  test('Button sizes visual comparison', async ({ page }) => {
    await page.goto('/?path=/story/ui-components-button--all-sizes');
    
    await page.waitForSelector('#storybook-root', { timeout: 10000 });
    await page.waitForLoadState('networkidle');

    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-all-sizes.png');
  });

  test('Individual button states', async ({ page }) => {
    const stories = [
      { name: 'default', path: '/?path=/story/ui-components-button--default' },
      { name: 'destructive', path: '/?path=/story/ui-components-button--destructive' },
      { name: 'outline', path: '/?path=/story/ui-components-button--outline' },
      { name: 'secondary', path: '/?path=/story/ui-components-button--secondary' },
      { name: 'ghost', path: '/?path=/story/ui-components-button--ghost' },
      { name: 'link', path: '/?path=/story/ui-components-button--link' },
      { name: 'disabled', path: '/?path=/story/ui-components-button--disabled' },
    ];

    for (const story of stories) {
      await page.goto(story.path);
      await page.waitForSelector('#storybook-root', { timeout: 10000 });
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`button-${story.name}.png`);
    }
  });

  test('Button hover states', async ({ page }) => {
    await page.goto('/?path=/story/ui-components-button--default');
    
    await page.waitForSelector('#storybook-root', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    const button = page.locator('button');
    
    // Normal state
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-default-normal.png');
    
    // Hover state
    await button.hover();
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-default-hover.png');
    
    // Focus state
    await button.focus();
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-default-focus.png');
  });

  test('Button responsive behavior', async ({ page }) => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1280, height: 720 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/?path=/story/ui-components-button--all-variants');
      
      await page.waitForSelector('#storybook-root', { timeout: 10000 });
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`button-variants-${viewport.name}.png`);
    }
  });
});