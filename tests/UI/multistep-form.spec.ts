import { expect, test } from '@playwright/test';

const url = 'http://localhost:3000/practice/form-v1.html';

test.describe('Multi-Step Form', () => {
  test('Full form fill and summary assertions', async ({ page }) => {
    await page.goto(url);
    // Step 1
    await page.getByLabel('Name:').fill('Test User');
    await page.getByLabel('Email:').fill('testuser@example.com');
    await page.getByRole('button', { name: 'Next' }).click();
    // Step 2
    await page.getByLabel('Favorite Food:').fill('Pizza');
    await page.getByRole('button', { name: 'Next' }).click();
    // Step 3
    await page.getByLabel('Country:').selectOption('Poland');
    await page.getByLabel('City:').selectOption('Warsaw');
    await page.getByRole('button', { name: 'Next' }).click();
    // Step 4
    await page.getByLabel('Job Title:').fill('QA Engineer');
    await page.getByRole('spinbutton', { name: 'Years of Experience:' }).fill('5');
    await page.getByRole('button', { name: 'Next' }).click();
    // Step 5
    await page.getByLabel('Hobbies:').fill('Reading, Traveling');
    await page.getByLabel('Interests:').fill('Technology, Art');
    await page.getByRole('button', { name: 'Next' }).click();

    // Assert summary values before submit (use simple text matching)
    await expect(page.locator('p', { hasText: 'Name:' })).toContainText('Test User');
    await expect(page.locator('p', { hasText: 'Email:' })).toContainText('testuser@example.com');
    await expect(page.locator('p', { hasText: 'Favorite Food:' })).toContainText('Pizza');
    await expect(page.locator('p', { hasText: 'Country:' })).toContainText(/poland/i);
    await expect(page.locator('p', { hasText: 'City:' })).toContainText(/warsaw/i);
    await expect(page.locator('p', { hasText: 'Job Title:' })).toContainText('QA Engineer');
    await expect(page.locator('p', { hasText: 'Years of Experience:' })).toContainText('5');
    await expect(page.locator('p', { hasText: 'Hobbies:' })).toContainText('Reading, Traveling');
    await expect(page.locator('p', { hasText: 'Interests:' })).toContainText('Technology, Art');

    // Confirm and submit
    await page.getByRole('checkbox', { name: /confirm/i }).check();
    await page.getByRole('button', { name: 'Submit' }).click();

    // Assert success message
    await expect(page.getByRole('heading', { name: /Thank You/i })).toBeVisible();
    await expect(page.locator('p', { hasText: 'Your information has been successfully submitted.' })).toBeVisible();
  });

  test('Validation: required fields', async ({ page }) => {
    await page.goto(url);
    await page.getByRole('button', { name: 'Next' }).click();
    // The form shows the email validation error if both fields are empty
    // Prefer the alert if present, else the inline error (pick first)
    const alert = page.getByTestId('dti-simple-alert-with-custom-message');
    const inline = page.locator('p#emailError');
    if (await alert.count()) {
      await expect(alert).toBeVisible();
    } else {
      await expect(inline).toBeVisible();
    }
  });

  test('Validation: invalid email format', async ({ page }) => {
    await page.goto(url);
    await page.getByLabel('Name:').fill('Jane Doe');
    await page.getByLabel('Email:').fill('not-an-email');
    await page.getByRole('button', { name: 'Next' }).click();
    const alert2 = page.getByTestId('dti-simple-alert-with-custom-message');
    const inline2 = page.locator('p#emailError');
    if (await alert2.count()) {
      await expect(alert2).toBeVisible();
    } else {
      await expect(inline2).toBeVisible();
    }
  });

  test('Navigation: previous/next buttons retain data', async ({ page }) => {
    await page.goto(url);
    await page.getByLabel('Name:').fill('Alice');
    await page.getByLabel('Email:').fill('alice@example.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByLabel('Name:')).toHaveValue('Alice');
    await expect(page.getByLabel('Email:')).toHaveValue('alice@example.com');
  });

  test('Edge case: refresh on step 2 resets form', async ({ page }) => {
    await page.goto(url);
    await page.getByLabel('Name:').fill('Bob');
    await page.getByLabel('Email:').fill('bob@example.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.reload();
    await expect(page.getByLabel('Name:')).toBeEmpty();
    await expect(page.getByLabel('Email:')).toBeEmpty();
  });
});
