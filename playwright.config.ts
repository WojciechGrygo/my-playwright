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
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',

  projects: [
    {
      name: 'UI-logged',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tmp/session.json',
      },
      dependencies: ['setup'],
      testMatch: '/UI-logged/*',
    },
    {
      name: 'UI-not-logged',
      use: {
        ...devices['Desktop Chrome'],
      },
      testMatch: '/UI-not-logged/*',
    },
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    { name: 'API', use: { ...devices['Desktop Chrome'] }, testMatch: /API/ },
    { name: 'Accessibility', use: { ...devices['Desktop Chrome'] }, testMatch: '/Accessibility/*' },
    { name: 'Visual-testing', use: { ...devices['Desktop Chrome'] }, testMatch: '/Visual-testing/*' },
  ],
});
