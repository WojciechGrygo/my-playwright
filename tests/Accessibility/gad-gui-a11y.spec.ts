import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { createHtmlReport } from 'axe-html-reporter';

const reportDir = 'reports/a11y/';

test('Accessibility - Welcome page', async ({ page }, testInfo) => {
  const reportName = `accessibility-report-welcome-page-${Date.now()}.html`;

  await page.goto('http://localhost:3000/learning/welcome.html');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  // await testInfo.attach('accessibility-scan-results', {
  //   body: JSON.stringify(accessibilityScanResults, null, 2),
  //   contentType: 'application/json',
  // });

  createHtmlReport({
    results: accessibilityScanResults,
    options: {
      outputDir: reportDir,
      reportFileName: reportName,
    },
  });

  expect(accessibilityScanResults.violations).toEqual([]);
});

test('Accessibility - Start Learning Today component', async ({ page }) => {
  const reportName = `accessibility-report-start-learning-today-${Date.now()}.html`;

  await page.goto('http://localhost:3000/learning/welcome.html');
  await page.locator('div.welcome-hero').waitFor(); // Ensure the component is loaded

  // Run accessibility scan only on the specific component
  const accessibilityScanResults = await new AxeBuilder({ page }).include('div.welcome-hero').analyze();

  createHtmlReport({
    results: accessibilityScanResults,
    options: {
      outputDir: reportDir,
      reportFileName: reportName,
    },
  });

  expect(accessibilityScanResults.violations).toEqual([]);
});
