const tasks = ['Buy the cheese', 'Buy the milk', 'Feed the cat', 'Book a doctors appointment', 'Walk the dog'];

import { test, expect } from '@playwright/test';

test.describe('Add Task', () => {
  test.beforeAll(async ({ request }) => {
    await request.post('/reset');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should add multiple tasks without refreshing', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
  
    for (const task of tasks) {
      await newTodo.fill(task);
      await page.click('text=Add');
    }
  
    for (const task of tasks) {
      await expect(page.locator('.todo-list')).toContainText(task);
    }
  });

  test('should prevent adding empty task', async ({ playwright, page }) => {
    const request = await playwright.request.newContext();
    await request.post('/reset');
    await request.dispose();
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill(''); // nothing
    await page.click('text=Add');
    await expect(page.locator('.todo-list')).toContainText('No tasks yet!', { timeout: 15000 });
  });

  test('should clear input after adding a task', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Finish homework');
    await page.click('text=Add');
    await expect(input).toHaveValue('');
  });

  test('flaky add task test - passes 50% of the time', async ({ page }) => {
    if (Math.random() > 0.5) {
      const task = 'This may or may not work';
      const newTodo = page.getByPlaceholder('What needs to be done?');
      await newTodo.fill(task);
      await page.click('text=Add');
      await expect(page.locator('.todo-list')).toContainText(task);
    } else {
      throw new Error('Simulated flaky failure');
    }
  });
});


test.describe('Add Tests with a loop', () => {
  test.beforeAll(async ({ request }) => {
    await request.post('/reset');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const task of tasks) {
    test(`should add task with refreshing ${task}`, async ({ page }) => {
      const newTodo = page.getByPlaceholder('What needs to be done?');
      await newTodo.fill(task);
      await page.click('text=Add');
      await expect(page.locator('.todo-list')).toContainText(task);
    });
  }

});

test.describe('Complete Task', () => {
  test.beforeAll(async ({ request }) => {
    await request.post('/reset');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should mark a task as completed when check is clicked', async ({ page }) => {
    const taskName = 'Walk the dog';
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(taskName);
    await page.click('text=Add');

    const checkLink = page.locator(`.todo-list li:has-text("${taskName}") .icon-check`);
    await Promise.all([
      page.waitForNavigation(),
      checkLink.click(),
    ]);

    const completedItem = page.locator('.todo-list li.done');
    await expect(completedItem).toContainText(taskName);
  });

  test('should update completed count', async ({ playwright, page }) => {
    const request = await playwright.request.newContext();
    await request.post('/reset');
    await request.dispose();
    const taskName = 'Check email';
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(taskName);
    await page.click('text=Add');

    const taskItem = page.locator('.todo-list li').filter({ hasText: taskName });
    const checkLink = taskItem.locator('.icon-check');
    await Promise.all([
      page.waitForNavigation(),
      checkLink.click(),
    ]);

    await expect(page.locator('.filter-buttons')).toContainText('Completed (1)', { timeout: 15000 });
  });

  test('flaky complete task test - passes 50% of the time', async ({ page }) => {
    const taskName = 'Sometimes complete me';
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(taskName);
    await page.click('text=Add');

    const taskItem = page.locator('.todo-list li').filter({ hasText: taskName });
    const checkLink = taskItem.locator('.icon-check');

    if (Math.random() > 0.5) {
      await Promise.all([
        page.waitForNavigation(),
        checkLink.click(),
      ]);
      await expect(page.locator('.todo-list li.done')).toContainText(taskName);
    } else {
      throw new Error('Simulated flaky failure on completion');
    }
  });
  
});

test.describe('Delete Task', () => {
  test.beforeAll(async ({ request }) => {
    await request.post('/reset');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should delete a task from the list', async ({ page }) => {
    const taskName = 'Feed the cat';
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(taskName);
    await page.click('text=Add');

    const deleteLink = page.locator(`.todo-list li:has-text("${taskName}") .icon-delete`);
    await Promise.all([
      page.waitForNavigation(),
      deleteLink.click(),
    ]);

    await expect(page.locator('.todo-list')).not.toContainText(taskName);
  });

  test('should show "No tasks yet!" if all are deleted', async ({ page }) => {
    const taskName = 'Only Task';
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(taskName);
    await page.click('text=Add');

    const deleteLink = page.locator(`.todo-list li:has-text("${taskName}") .icon-delete`);
    await Promise.all([
      page.waitForNavigation(),
      deleteLink.click(),
    ]);

    await expect(page.locator('.todo-list')).toContainText('No tasks yet!', { timeout: 10000 });
  });
});

test.describe('Filter Tasks', () => {

  test('flaky filter test -  - passes 50% of the time', async ({ page }) => {
    const taskName = 'Flaky filter me';
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(taskName);
    await page.click('text=Add');

    if (Math.random() > 0.5) {
      await page.locator(`.todo-list li:has-text("${taskName}") .icon-check`).click();
      await page.click('text=Completed');
      await expect(page.locator('.todo-list')).toContainText(taskName);
    } else {
      throw new Error('Simulated flaky failure');
    }
  });
  test.beforeAll(async ({ request }) => {
    await request.post('/reset');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should filter by Active tasks', async ({ page }) => {
    const taskName = 'Read a book';
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(taskName);
    await page.click('text=Add');

    await Promise.all([
      page.waitForNavigation(),
      page.locator(`.todo-list li:has-text("${taskName}") .icon-check`).click(),
    ]);

    await page.click('text=Active');
    await expect(page.locator('.todo-list')).not.toContainText(taskName);
  });

  test('should filter by Completed tasks', async ({ page }) => {
    const taskName = 'Workout';
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(taskName);
    await page.click('text=Add');

    await Promise.all([
      page.waitForNavigation(),
      page.locator(`.todo-list li:has-text("${taskName}") .icon-check`).click(),
    ]);

    await page.click('text=Completed');
    await expect(page.locator('.todo-list')).toContainText(taskName);
  });

  test('should show all tasks with All filter', async ({ page }) => {
    const taskName = 'Meditate';
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(taskName);
    await page.click('text=Add');

    await page.click('text=All');
    await expect(page.locator('.todo-list')).toContainText(taskName);
  });
});
