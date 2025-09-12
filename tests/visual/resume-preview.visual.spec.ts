import { test, expect } from '@playwright/test';

test.describe('Resume Preview Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Resume themes visual comparison', async ({ page }) => {
    const themes = [
      { name: 'simple', path: '/?path=/story/features-resume-preview--simple-theme' },
      { name: 'modern', path: '/?path=/story/features-resume-preview--modern-theme' },
      { name: 'centered', path: '/?path=/story/features-resume-preview--centered-theme' },
      { name: 'sidebar', path: '/?path=/story/features-resume-preview--sidebar-theme' },
      { name: 'executive', path: '/?path=/story/features-resume-preview--executive-theme' },
    ];

    for (const theme of themes) {
      await page.goto(theme.path);
      await page.waitForSelector('#storybook-root', { timeout: 15000 });
      await page.waitForLoadState('networkidle');
      
      // Scroll to top to ensure full capture
      await page.evaluate(() => window.scrollTo(0, 0));
      
      // Take full page screenshot for resume themes
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`resume-${theme.name}-theme.png`, {
        fullPage: true,
      });
    }
  });

  test('All themes showcase', async ({ page }) => {
    await page.goto('/?path=/story/features-resume-preview--all-themes');
    
    await page.waitForSelector('#storybook-root', { timeout: 20000 });
    await page.waitForLoadState('networkidle');
    
    // Wait a bit more for all themes to render
    await page.waitForTimeout(2000);
    
    await expect(page.locator('#storybook-root')).toHaveScreenshot('resume-all-themes-showcase.png', {
      fullPage: true,
    });
  });

  test('Resume with different data sets', async ({ page }) => {
    const dataVariations = [
      { name: 'minimal', path: '/?path=/story/features-resume-preview--minimal-data' },
      { name: 'executive', path: '/?path=/story/features-resume-preview--executive-profile' },
      { name: 'fresh-graduate', path: '/?path=/story/features-resume-preview--fresh-graduate' },
      { name: 'mid-level', path: '/?path=/story/features-resume-preview--mid-level' },
      { name: 'career-changer', path: '/?path=/story/features-resume-preview--career-changer' },
      { name: 'data-scientist', path: '/?path=/story/features-resume-preview--data-scientist' },
    ];

    for (const variation of dataVariations) {
      await page.goto(variation.path);
      await page.waitForSelector('#storybook-root', { timeout: 15000 });
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`resume-${variation.name}.png`, {
        fullPage: true,
      });
    }
  });

  test('Empty resume state', async ({ page }) => {
    await page.goto('/?path=/story/features-resume-preview--empty-resume');
    
    await page.waitForSelector('#storybook-root', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('#storybook-root')).toHaveScreenshot('resume-empty-state.png');
  });

  test('Resume responsive layouts', async ({ page }) => {
    const viewports = [
      { name: 'mobile-small', width: 320, height: 568 },
      { name: 'mobile-large', width: 414, height: 896 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1024, height: 768 },
      { name: 'desktop-large', width: 1440, height: 900 },
    ];

    // Test modern theme at different viewport sizes
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/?path=/story/features-resume-preview--modern-theme');
      
      await page.waitForSelector('#storybook-root', { timeout: 15000 });
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`resume-modern-${viewport.name}.png`, {
        fullPage: true,
      });
    }
  });

  test('Print layout simulation', async ({ page }) => {
    // Test how the resume looks in print media simulation
    await page.emulateMedia({ media: 'print' });
    
    const themes = ['simple', 'modern', 'executive'];
    
    for (const theme of themes) {
      await page.goto(`/?path=/story/features-resume-preview--${theme}-theme`);
      await page.waitForSelector('#storybook-root', { timeout: 15000 });
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`resume-${theme}-print.png`, {
        fullPage: true,
      });
    }
  });

  test('Dark theme compatibility', async ({ page }) => {
    // Test resume themes with dark mode
    await page.emulateMedia({ colorScheme: 'dark' });
    
    const themes = ['simple', 'modern', 'centered'];
    
    for (const theme of themes) {
      await page.goto(`/?path=/story/features-resume-preview--${theme}-theme`);
      await page.waitForSelector('#storybook-root', { timeout: 15000 });
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`resume-${theme}-dark.png`, {
        fullPage: true,
      });
    }
  });
});