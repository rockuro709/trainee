//playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

export const baseApiURL = "https://api.discogs.com";
export const RELEASES_DATA_PATH = "./releases.data.json";
export const STORAGE_STATE_PATH = "./storageState.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const requiredEnvVars = [
  "DISCOGS_USERNAME",
  "DISCOGS_EMAIL",
  "DISCOGS_PASSWORD",
  "DISCOGS_API_TOKEN",
];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(
      `Environment variable ${varName} is not set. Please check your .env file or CI/CD configuration.`,
    );
  }
}
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  //testDir: "./tests",
  globalSetup: "./global-setup.ts",
  globalTeardown: "./global-teardown.ts",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://www.discogs.com/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "auth-ui",
      testDir: "./tests/ui/authenticated/",
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_PATH,
      },
    },

    {
      name: "guest-ui",
      testDir: "./tests/ui/guest/",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    //в тесте можно не использовать storageState
    {
      name: "fixture-logout-ui",
      testDir: "./tests/ui/logout/",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "api",
      testDir: "./tests/api/",
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
