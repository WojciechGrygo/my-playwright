import { expect, test } from '@playwright/test';

test.describe('System monitoring - masking and mocking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/visual-testing-v1B.html');
  });

  test.fail('visually System Metrics widget with dynamic elements (will fail)', async ({ page }) => {
    // Arrange:
    const metricsWidget = page.getByTestId('static-widget');

    // Assert:
    await expect(metricsWidget).toHaveScreenshot();
  });

  test('visually System Metrics widget with dynamic elements (masking)', async ({ page }) => {
    // Arrange:
    const metricsWidget = page.getByTestId('static-widget');
    const performanceChart = page.getByTestId('performance-chart');

    // Assert:
    await expect(metricsWidget).toHaveScreenshot({ mask: [performanceChart] });
  });

  test('visually System Metrics widget with dynamic elements (mocking)', async ({ page }) => {
    // Arrange:
    const metricsWidget = page.getByTestId('static-widget');
    const mockedData = {
      data: [
        43.34132127958318, 98.91228763107391, 97.4656943352334, 68.24200068277753, 70.30900507155665, 8.981765741959633, 27.739459602195023,
        78.92208512392736, 90.51464578975006, 18.389207214044504, 17.520619231293555, 26.908953600674153, 84.70333205781522, 70.1093021912057,
        54.63553139829066, 54.29667443414286, 89.32364285356032, 79.21924430799568, 31.20320540121978, 61.42118871945187, 77.5403668810052,
        68.8239711932308, 31.179103712884103, 58.32400527822428, 83.61126506547237, 36.72503452881324, 73.54669239484248, 29.93802558733261,
        18.180286098835413, 83.44274564790601, 41.886822666591314, 79.2235048220034, 29.363844749993895, 50.19391532600028, 17.599167835592958,
        72.29362211959872, 2.1485643191337678, 15.587002131049926, 91.00725946296801, 94.9463605289189, 92.09001143305287, 56.67449619551416,
        12.975231693904203, 89.39505170836624, 31.811933065259275, 22.08001415425657, 22.399111421401365, 73.30180000243767, 7.766782049552369,
        14.032870959857426,
      ],
    };

    await page.route('/api/v1/data/random/numbers', async (route) => {
      await route.fulfill({ json: mockedData });
    });

    await page.goto('/practice/visual-testing-v1B.html');

    // Assert:
    await expect(metricsWidget).toHaveScreenshot();
  });
});
