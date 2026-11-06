import { expect, test } from '@playwright/test';

test.describe('API samples', () => {
  test('gets the Microsoft Playwright repository', async ({ request }) => {
    const response = await request.get('https://api.github.com/repos/microsoft/playwright');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const repository = await response.json();
    expect(repository.name).toBe('playwright');
    expect(repository.owner.login).toBe('microsoft');
  });

  test('gets a post from a REST API', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');

    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.title).toBeTruthy();
  });

  test('creates a post with a REST API', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Playwright API test',
        body: 'Created by a Playwright API test',
        userId: 1,
      },
    });

    expect(response.status()).toBe(201);

    const createdPost = await response.json();
    expect(createdPost.title).toBe('Playwright API test');
    expect(createdPost.userId).toBe(1);
  });
});
