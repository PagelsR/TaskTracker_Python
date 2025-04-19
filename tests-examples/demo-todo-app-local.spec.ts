
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request, page }) => {
  await request.post('http://localhost:5000/reset');
  await page.goto('http://localhost:5000');
});

test.describe('Add Task', () => {
  const tasks = ['Buy some cheese', 'Feed the cat', 'Book a doctors appointment'];

  for (const task of tasks) {
    test(`should add task: ${task}`, async ({ page }) => {
      const newTodo = page.getByPlaceholder('What needs to be done?');
      await newTodo.fill(task);
      await page.click('text=Add');
      await expect(page.locator('.todo-list')).toContainText(task);
    });
  }

  test('should prevent adding empty task', async ({ page }) => {
    await page.click('text=Add');
    await expect(page.locator('.todo-list')).toContainText('No tasks yet!');
  });
  

  test('should clear input after adding a task', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Finish homework');
    await page.click('text=Add');
    await expect(input).toHaveValue('');
  });
});

test.describe('Complete Task', () => {
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

  test('should update completed count', async ({ page }) => {
    const taskName = 'Check email';
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(taskName);
    await page.click('text=Add');

    const checkLink = page.locator(`.todo-list li:has-text("${taskName}") .icon-check`);
    await Promise.all([
      page.waitForNavigation(),
      checkLink.click(),
    ]);

    await expect(page.locator('.filter-buttons')).toContainText('Completed (1)');
  });
});

test.describe('Delete Task', () => {
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

    await expect(page.locator('.todo-list')).toContainText('No tasks yet!');
  });
});

test.describe('Filter Tasks', () => {
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
