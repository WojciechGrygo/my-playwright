import test, { expect } from '@playwright/test';

const articles = [
  { id: 57, title: 'Myth: Testing is only for finding bugs' },
  { id: 58, title: 'Myth: Testing can be done by anyone' },
  { id: 59, title: 'Myth: Testing is only done at the end of development' },
  { id: 39, title: 'The events of Scrum framework' },
];

articles.forEach((article) => {
  test(`Article with ${article.id} should be visible with correct title`, async ({ page }) => {
    await page.goto(`/article.html?id=${article.id}`);
    await expect(page.getByTestId('article-title')).toHaveText(article.title);
  });
});
