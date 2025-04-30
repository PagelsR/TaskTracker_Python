import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://127.0.0.1:5000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Stir Trek 2025 CLI/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://127.0.0.1:5000/');

  await expect(page.locator('body')).toContainText('Star');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get Started' }).click();

});


test('about page', async ({ page }) => {
  await page.goto('http://127.0.0.1:5000/');

  // Click the about link.
  await page.getByRole('link', { name: 'About' }).click();

  // Expects page to have a heading with the name of About Us.
  await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
});
