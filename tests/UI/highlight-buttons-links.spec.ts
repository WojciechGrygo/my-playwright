// Playwright test: highlight all buttons and links with red border, then take screenshot
import { test } from '@playwright/test';

test('Highlight buttons and links, take screenshot', async ({ page }) => {
  await page.goto('http://localhost:3000/articles.html');
  // Add red border to all buttons and links
  await page.addStyleTag({
    content: `
    button, a {
      border: 2px solid red !important;
    }
  `,
  });
  // Take screenshot of the whole page
  await page.screenshot({ path: 'screenshots/highlighted-buttons-links.png', fullPage: true });
});
