import test, { expect } from '@playwright/test';

test.describe('Finding different elements with raw locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/practice/simple-elements.html');
  });

  test('Find label element by ID (CSS)', async ({ page }) => {
    // 1 - Locate the element with getByRole and assert its visibility
    const elementLocator = page.locator('#id-label-element');
    await expect(elementLocator).toBeVisible();
  });

  test('Find checkbox', async ({ page }) => {
    const idLocator = page.locator('#id-checkbox');
    const classLocator = page.locator('.my-checkbox');
    const roleLocator = page.getByRole('checkbox');
    const testIdLocator = page.getByTestId('dti-checkbox');
    const attrLocator = page.locator('[ckbx="val1"]');

    await expect.soft(idLocator).toBeVisible();
    await expect.soft(classLocator).toBeVisible();
    await expect.soft(roleLocator).toBeVisible();
    await expect.soft(testIdLocator).toBeVisible();
    await expect.soft(attrLocator).toBeVisible();
  });
});
