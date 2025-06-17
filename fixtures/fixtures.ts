// fixtures/fixtures.ts
import { test as baseTest } from "@playwright/test";
import { Web } from "../utils/Web";
import { LoginCredentials } from "../types/LoginCredentials";
import { Page } from "@playwright/test";

type MyFixtures = {
  web: Web;
  testUser: LoginCredentials;
  loggedInPage: Page; //
};

export const test = baseTest.extend<MyFixtures>({
  testUser: async ({}, use) => {
    const user: LoginCredentials = {
      username: process.env.DISCOGS_USERNAME!,
      email: process.env.DISCOGS_EMAIL!,
      password: process.env.DISCOGS_PASSWORD!,
    };
    if (!user.username && !user.email) {
      throw new Error("DISCOGS_USERNAME or DISCOGS_EMAIL must be set.");
    }
    if (!user.password) {
      throw new Error("DISCOGS_PASSWORD must be set.");
    }
    await use(user);
  },

  loggedInPage: async ({ page: basePage, testUser }, use) => {
    const web = new Web(basePage);
    await web.authService.login(testUser);

    await use(basePage);
  },

  page: async ({ page }, use) => {
    const web = new Web(page);
    await page.goto("/");
    await web.cookieBanner.acceptCookies();
    await use(page);
  },

  web: async ({ page }, use) => {
    const web = new Web(page);
    await use(web);
  },
});
