import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [1440, 390]) {
  test(`no serious or critical accessibility violations at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const scan = async () => {
      const result = await new AxeBuilder({ page }).analyze();
      expect(result.violations.filter(v => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
    };
    await scan();
    if (width === 390) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await scan();
    }
  });
}
