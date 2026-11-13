import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });
test('mobile menu toggles, closes on Escape and navigation, and adapts to desktop', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 500));
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

for (const width of [390, 1440]) {
  test(`hero identity reveals the navbar near the top at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const header = page.locator('.site-header');
    const brand = page.locator('.hero-brand');
    await expect(header).toBeHidden();
    await expect(header).toHaveAttribute('inert', '');
    await expect(brand).toBeVisible();
    const top = await brand.evaluate(el => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate(y => window.scrollTo(0, y), top - 30);
    await expect(header).toBeHidden();
    await page.evaluate(y => window.scrollTo(0, y), top - 20);
    await expect(header).toBeVisible();
    await expect(header).not.toHaveAttribute('inert', '');
    await expect(brand).toBeHidden();
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toBeHidden();
    await expect(brand).toBeVisible();
  });
}
