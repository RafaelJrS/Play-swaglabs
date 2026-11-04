import { test } from '@playwright/test';

test.describe('Swag Labs Seed', () => {
  test('seed', async ({ page }) => {
    await page.goto('/');
  });
});
