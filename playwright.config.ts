import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.URL,
    actionTimeout: 5_000,
    trace: 'retain-on-failure',
    video: 'off',
    screenshot: 'off',
  },

  projects: [
    {
      name: 'UI',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
      testMatch: /UI/,
    },
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    { name: 'API', use: { ...devices['Desktop Chrome'] }, testMatch: /API/ },
  ],
});
