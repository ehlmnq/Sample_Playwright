import { expect, test } from '@playwright/test';

test('mocks an API response with fixture data', async ({ page }) => {
  await page.route('https://playwright.dev/api/products', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        products: [
          { id: 1, name: 'Mock laptop', price: 999 },
          { id: 2, name: 'Mock keyboard', price: 99 },
        ],
      }),
    });
  });

  await page.goto('https://playwright.dev/');

  const products = await page.evaluate(async () => {
    const response = await fetch('/api/products');
    return response.json();
  });

  expect(products).toEqual({
    products: [
      { id: 1, name: 'Mock laptop', price: 999 },
      { id: 2, name: 'Mock keyboard', price: 99 },
    ],
  });
});
