import { test, expect } from '@playwright/test';

test('experience is exclusive and keyboard operable', async ({ page }) => {
  await page.goto('/');
  const roles = page.locator('details');
  await expect(roles).toHaveCount(7);
  await expect(roles.nth(0)).toHaveAttribute('open', '');
  await expect(roles.nth(0)).toHaveCSS('border-top-color', 'rgb(255, 59, 71)');
  await roles.nth(1).locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(roles.nth(1)).toHaveAttribute('open', '');
  await expect(roles.nth(0)).not.toHaveAttribute('open', '');
  await expect(roles.nth(0)).toHaveCSS('border-top-color', 'rgb(36, 30, 30)');
  await expect(roles.nth(1)).toHaveCSS('border-top-color', 'rgb(255, 59, 71)');
  await expect(roles.nth(0).locator('.tags')).toBeVisible();
  await page.keyboard.press('Space');
  await expect(roles.nth(1)).not.toHaveAttribute('open', '');
  await roles.nth(1).hover();
  await expect(roles.nth(1)).toHaveCSS('border-top-color', 'rgb(36, 30, 30)');
  await expect(roles.nth(1)).toHaveCSS('box-shadow', 'none');
});
