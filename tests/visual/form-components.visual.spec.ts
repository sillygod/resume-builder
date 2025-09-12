import { test, expect } from '@playwright/test';

test.describe('Form Components Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Input component variants', async ({ page }) => {
    await page.goto('/?path=/story/ui-components-input--default');
    
    await page.waitForSelector('#storybook-root', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('#storybook-root')).toHaveScreenshot('input-default.png');
  });

  test('Card component variants', async ({ page }) => {
    await page.goto('/?path=/story/ui-components-card--default');
    
    await page.waitForSelector('#storybook-root', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('#storybook-root')).toHaveScreenshot('card-default.png');
  });

  test('Personal Info form section', async ({ page }) => {
    await page.goto('/?path=/story/features-personalinfo--default');
    
    await page.waitForSelector('#storybook-root', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('#storybook-root')).toHaveScreenshot('personal-info-form.png');
  });

  test('Work Experience form section', async ({ page }) => {
    await page.goto('/?path=/story/features-workexperience--default');
    
    await page.waitForSelector('#storybook-root', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('#storybook-root')).toHaveScreenshot('work-experience-form.png');
  });

  test('Education form section', async ({ page }) => {
    await page.goto('/?path=/story/features-education--default');
    
    await page.waitForSelector('#storybook-root', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('#storybook-root')).toHaveScreenshot('education-form.png');
  });

  test('Skills form section', async ({ page }) => {
    await page.goto('/?path=/story/features-skills--default');
    
    await page.waitForSelector('#storybook-root', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('#storybook-root')).toHaveScreenshot('skills-form.png');
  });

  test('Form interaction states', async ({ page }) => {
    await page.goto('/?path=/story/ui-components-input--default');
    
    await page.waitForSelector('#storybook-root', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('input').first();
    
    // Normal state
    await expect(page.locator('#storybook-root')).toHaveScreenshot('input-normal.png');
    
    // Focus state
    await input.focus();
    await expect(page.locator('#storybook-root')).toHaveScreenshot('input-focus.png');
    
    // With content
    await input.fill('Test content');
    await expect(page.locator('#storybook-root')).toHaveScreenshot('input-filled.png');
  });

  test('Form components responsive behavior', async ({ page }) => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1280, height: 720 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/?path=/story/features-personalinfo--default');
      
      await page.waitForSelector('#storybook-root', { timeout: 10000 });
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`personal-info-${viewport.name}.png`);
    }
  });
});