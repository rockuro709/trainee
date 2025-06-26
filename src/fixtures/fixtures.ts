// src/fixtures/fixtures.ts
import { test as baseTest, APIRequestContext } from "@playwright/test";
import { Web } from "../utils/Web";
import { LoginCredentials } from "../types/LoginCredentials";
import { baseApiURL } from "../../playwright.config";
import { ClientManager } from "../clients/ClientManager";

type MyFixtures = {
  testUser: LoginCredentials;
  web: Web;
  webAuth: Web;
  webLoggedIn: Web;
  authorizedContext: APIRequestContext;
  api: ClientManager;
};

export const test = baseTest.extend<MyFixtures>({
  testUser: async ({}, use) => {
    const user: LoginCredentials = {
      username: process.env.DISCOGS_USERNAME!,
      email: process.env.DISCOGS_EMAIL!,
      password: process.env.DISCOGS_PASSWORD!,
    };
    await use(user);
  },

  web: async ({ page }, use) => {
    const web = new Web(page);
    await web.cookieBanner.navigate();
    await web.cookieBanner.acceptCookies();
    await use(web);
  },

  webAuth: async ({ web }, use) => {
    await web.basePage.navigate("/my");
    await web.header.loggedInAsAriaLabel.waitFor({
      state: "visible",
      timeout: 15000,
    });
    await use(web);
  },

  webLoggedIn: async ({ testUser, web }, use) => {
    await web.authService.login(testUser);
    await use(web);
  },

  authorizedContext: async ({ playwright }, use) => {
    const apiToken = process.env.DISCOGS_API_TOKEN!;

    const context = await playwright.request.newContext({
      baseURL: baseApiURL,
      extraHTTPHeaders: {
        "User-Agent": "MyTraineeTestFramework/1.0",
        Authorization: `Discogs token=${apiToken}`,
      },
    });
    await use(context);
    await context.dispose();
  },

  api: async ({ authorizedContext, testUser }, use) => {
    const clientManager = new ClientManager(
      authorizedContext,
      testUser.username,
    );
    await use(clientManager);
  },
});
