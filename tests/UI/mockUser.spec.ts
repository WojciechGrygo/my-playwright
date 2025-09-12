import { expect, test } from '@playwright/test';

test('Mock user data', async ({ page }) => {
  await page.route(`${process.env.URL}/api/v1/data/random/simple-user`, async (route) => {
    const json = {
      userId: 'U5467',
      username: 'thiagocabrera445',
      firstName: 'Thiago',
      lastName: 'Cabrera',
      email: 'thiagocabrera445@test3.test.com',
      phone: '+845-999-695-6106',
      dateOfBirth: '1974-05-07T23:00:00.000Z',
      profilePicture: 'facca2a3-2ca9-4fc6-8a21-28214c0a2bd7.jpg',
      address: {
        street: '458 Oak Street',
        city: 'Midway City',
        postalCode: 65770,
        country: 'France',
      },
      lastLogin: '2023-08-07T22:00:00.000Z',
      accountCreated: '2022-05-14T22:00:00.000Z',
      status: 0,
    };
    await route.fulfill({ json });
  });

  await page.goto(`${process.env.URL}/practice/random-simple-user-v1.html`);

  await expect(page.getByText('Random Simple User (from API)')).toBeVisible();
  await expect(page.getByTestId('user-full-name')).toHaveText('Thiago Cabrera');
});

test('Modify only user name and lastname', async ({ page }) => {
  await page.route(`${process.env.URL}/api/v1/data/random/simple-user`, async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.firstName = 'Marek';
    json.lastName = 'Kowalski'; // Fixed the property name to match the original

    await route.fulfill({ json });
  });

  await page.goto(`${process.env.URL}/practice/random-simple-user-v1.html`);

  await expect(page.getByText('Random Simple User (from API)')).toBeVisible();
  await expect(page.getByTestId('user-full-name')).toHaveText('Marek Kowalski');
});
