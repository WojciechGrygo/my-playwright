import { expect, test } from '@playwright/test';

const userName = process.env.USER;

test('Successful login', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Enter User Email' }).fill(userName);
  await page.getByRole('textbox', { name: 'Enter Password' }).fill(process.env.PASSWORD);
  await page.locator('#loginButton').click();
  await expect(page.getByText(`Hi ${userName}`)).toBeVisible();
});