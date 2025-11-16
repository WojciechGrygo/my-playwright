import { expect, test } from '@playwright/test';

test.describe('Locator filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/simple-multiple-elements-no-ids.html');
  });

  test.describe('Finding element - different approaches', () => {
    test('Single button click using options', async ({ page }) => {
      await page.getByRole('button', { name: 'Click me!' }).click();
      await expect(page.getByTestId('dti-results')).toHaveText('You clicked the button!');
    });

    test('Single button click (using filter and hasText)', async ({ page }) => {
      await page.getByRole('button').filter({ hasText: 'Click me!' }).click();
      await expect(page.getByTestId('dti-results')).toHaveText('You clicked the button!');
    });
  });

  test.describe('Buttons in table - different approaches', () => {
    test('Single button click (chained getBy)', async ({ page }) => {
      await page.getByRole('row', { name: 'Row 2' }).getByRole('button').click();
      await expect(page.getByTestId('dti-results')).toHaveText('You clicked the button! (row 2)');
    });

    test('Single button click (using filter and has)', async ({ page }) => {
      await page.getByRole('row').filter({ hasText: 'Row 2' }).getByRole('button').click();
      await expect(page.getByTestId('dti-results')).toHaveText('You clicked the button! (row 2)');
    });
  });
});
