import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:5000/');
});

test.describe('New Todo', () => {

  test('should allow me to add todo items', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');

    await newTodo.fill('Task 1');
    await newTodo.press('Enter');

    await newTodo.fill('Task 2');
    await newTodo.press('Enter');

    await newTodo.fill('Task 3');
    await newTodo.press('Enter');
    
    await expect(page.locator('body')).toContainText('3 items left');
  });

  test('should allow me to filter active tasks', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');

    await newTodo.fill('Task 1');
    await newTodo.press('Enter');
    await newTodo.fill('Task 2');
    await newTodo.press('Enter');

    await page.locator('a.icon-check').first().click(); // Mark the first task as completed

    await page.locator('a', { hasText: 'Active' }).click(); // Click on the "Active" filter

    const activeTasks = await page.locator('.todo-list li:not(.done)').count();
    expect(activeTasks).toBe(1); // Only one active task should remain
  });

  test('should allow me to filter completed tasks', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');

    await newTodo.fill('Task 1');
    await newTodo.press('Enter');
    await newTodo.fill('Task 2');
    await newTodo.press('Enter');

    await page.locator('a.icon-check').first().click(); // Mark the first task as completed

    await page.locator('a', { hasText: 'Completed' }).click(); // Click on the "Completed" filter

    const completedTasks = await page.locator('.todo-list li.done').count();
    expect(completedTasks).toBe(1); // Only one completed task should be visible
  });

});
