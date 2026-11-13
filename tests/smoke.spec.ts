import { test, expect } from '@playwright/test';

test('page, navigation, original experience and PDF downloads', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('I help teams ship software their customers can trust.');
  for (const target of ['why-quality', 'experience', 'skills', 'projects', 'contact']) {
    await expect(page.locator(`#${target}`)).toHaveCount(1);
    await expect(page.getByRole('navigation', { name: 'Main' }).locator(`[href="#${target}"]`)).toBeVisible();
  }
  await expect(page.locator('.experience-details li')).toHaveCount(26);
  for (const name of ['Mauro_Pedano_CV_One_Page.pdf', 'Mauro_Pedano_CV_ATS.pdf']) {
    await expect(page.locator(`a[href="asset/resume/${name}"]`).first()).toBeVisible();
    const response = await request.get(`/asset/resume/${name}`);
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
  }
  expect(errors).toEqual([]);
});

for (const width of [1440, 1024, 768, 390, 360]) {
  test(`layout and images at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
    }
    if (width >= 768) {
      await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
    }
  });
}

test('contact validates required fields and retains the Formspree contract', async ({ page }) => {
  await page.goto('/');
  const form = page.locator('form');
  await expect(form).toHaveAttribute('action', 'https://formspree.io/f/xpzvzyjr');
  await expect(form).toHaveAttribute('method', 'POST');
  await expect(page.getByLabel('Your name')).toHaveAttribute('required', '');
  await expect(page.getByLabel('Your email')).toHaveAttribute('type', 'email');
  await expect(page.getByLabel("What's on your mind?")).toHaveAttribute('required', '');
  expect(await form.evaluate((el: HTMLFormElement) => el.checkValidity())).toBe(false);
  await page.getByLabel('Your name').fill('Test visitor');
  await page.getByLabel('Your email').fill('visitor@example.com');
  await page.getByLabel("What's on your mind?").fill('Local validation only.');
  expect(await form.evaluate((el: HTMLFormElement) => el.checkValidity())).toBe(true);
});
