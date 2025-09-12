import test, { expect } from '@playwright/test';

test('Mock new product in Shopping cart', async ({ page }) => {
  await page.route(`${process.env.URL}/api/v1/data/random/ecommerce-shopping-cart-simple`, async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    const game = {
      product: {
        id: 101,
        name: 'Game',
        price: 39.99,
        icon: '🎮',
      },
      quantity: 1,
      subtotal: 39.99,
    };
    json.cartItems.push(game);
    await route.fulfill({ response, json });
  });

  await page.goto(`${process.env.URL}/practice/random-shopping-cart-v1.html`);
  const productData = ['Game', '🎮', '39.99', '1', '39.99'];

  // Use a for...of loop instead of forEach for proper async handling
  for (const data of productData) {
    await expect(page.locator('tr', { hasText: productData[0] })).toContainText(data);
  }
});
