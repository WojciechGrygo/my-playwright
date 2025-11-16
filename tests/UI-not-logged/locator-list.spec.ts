import { expect, test } from '@playwright/test';

test.describe('Locator lists', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/simple-multiple-elements-no-ids.html');
  });

  test('All buttons on page', async ({ page }) => {
    const locator = page.getByRole('button');
    console.log(await locator.count());

    await expect(locator).toHaveCount(7);
  });

  test('action on nth button', async ({ page }) => {
    await page.getByRole('button').nth(2).click();
    await expect(page.getByTestId('dti-results')).toHaveText('You clicked the button! (Second one!)');
  });

  test('action on multiple buttons', async ({ page }) => {
    const allButtonLocators = await page.getByRole('button', { name: 'Click!' }).all();
    for (const button of allButtonLocators) {
      const expectedIndex = allButtonLocators.indexOf(button) + 1;
      await button.click();
      await expect(page.getByTestId('dti-results')).toHaveText(`You clicked the button! (row ${expectedIndex})`);
    }
  });

  test('check all checkboxes and assert the count', async ({ page }) => {
    const checkboxLocator = page.getByRole('checkbox');
    await expect(checkboxLocator).toHaveCount(5);

    const allCheckboxLocators = await checkboxLocator.all();
    for (const checkbox of allCheckboxLocators) {
      const expectedIndex = allCheckboxLocators.indexOf(checkbox) + 1;
      await checkbox.check();
      await expect.soft(page.getByTestId('dti-results')).toHaveText(`Checkbox is checked! (Opt ${expectedIndex}!)`);
    }
  });
});
