import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { createHtmlReport } from 'axe-html-reporter';

test('Accessibility - Inpost.co.uk home page', async ({ page }) => {
  await page.goto('https://inpost.co.uk/');
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  createHtmlReport({
    results: accessibilityScanResults,
    options: {
      outputDir: 'reports/a11y/',
      reportFileName: `accessibility-report-inpost-uk-${Date.now()}.html`,
    },
  });

  expect(accessibilityScanResults.violations).toEqual([]);
});
