import test, { expect } from '@playwright/test';

test.describe('Finding different elements with getBy methods', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/practice/simple-elements.html');
  });

  test('Find button element by getByRole methods', async ({ page }) => {
    // 1 - Locate the element with getByRole and assert its visibility
    const elementLocator = page.getByRole('button', { name: 'Click Me' });
    await expect(elementLocator).toBeVisible();
  });

  test('Find button element by getByText methods', async ({ page }) => {
    // 1 - Locate the element with getByText and click it
    const elementLocator = page.getByText('Click Me');
    await elementLocator.click();

    // 2 - Assert that the result text is visible
    await expect(page.getByTestId('dti-results')).toHaveText('You clicked the button!');
  });
});
