import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });
test('mobile menu toggles, closes on Escape and navigation, and adapts to desktop', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('.menu-toggle');
  const menu = page.getByRole('navigation', { name: 'Main' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeHidden();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(menu).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(menu.getByRole('link', { name: 'Why quality' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(menu).toBeHidden();
  await toggle.click();
  await menu.getByRole('link', { name: 'Skills', exact: true }).click();
  await expect(menu).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#skills$/);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(menu).toBeVisible();
  await expect(toggle).toBeHidden();
});
