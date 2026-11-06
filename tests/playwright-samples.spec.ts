import { expect, test } from '@playwright/test';

test('navigation', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveURL('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('locator interaction', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const getStarted = page.getByRole('link', { name: 'Get started' });
  await getStarted.click();

  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('assertions', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect(page).toHaveTitle(/Playwright/);
});

test.describe('test isolation', () => {
  test('first isolated page', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveURL('https://playwright.dev/');
  });

  test('second isolated page', async ({ page }) => {
    await expect(page).toHaveURL('about:blank');
  });
});

test.describe('navigation hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('main navigation', async ({ page }) => {
    await expect(page).toHaveURL('https://playwright.dev/');
  });
});
