// src/fixtures/fixtures.ts
import { test as baseTest } from "@playwright/test";
import { Web } from "../utils/Web";
import { LoginCredentials } from "../types/LoginCredentials";
import { baseApiURL } from "../../playwright.config";
import { ClientManager } from "../clients/ClientManager";
import { PublicClientManager } from "../clients/PublicClientManager";

type MyFixtures = {
  testUser: LoginCredentials;
  web: Web;
  webAuth: Web;
  webLoggedIn: Web;
  api: ClientManager;
  publicApi: PublicClientManager;
  randomReleaseId: number;
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

  webAuth: async ({ page }, use) => {
    const web = new Web(page);
    await web.basePage.navigate("/my");
    await web.cookieBanner.acceptCookies();
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

  api: async ({ playwright, testUser }, use) => {
    const apiToken = process.env.DISCOGS_API_TOKEN!;
    const context = await playwright.request.newContext({
      baseURL: baseApiURL,
      extraHTTPHeaders: {
        "User-Agent": "MyTraineeTestFramework/1.0",
        Authorization: `Discogs token=${apiToken}`,
      },
    });

    const clientManager = new ClientManager(context, testUser.username);
    await use(clientManager);

    await context.dispose();
  },

  publicApi: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: baseApiURL,
      extraHTTPHeaders: {
        "User-Agent": "MyTraineeTestFramework/1.0",
      },
    });

    const publicClientManager = new PublicClientManager(context);
    await use(publicClientManager);

    await context.dispose();
  },

  randomReleaseId: async ({ publicApi }, use) => {
    const LABEL_ID = 2294;

    const initialResponse = await publicApi.labelClient.getReleasesByLabelId(
      LABEL_ID,
      { per_page: 1 },
    );
    const totalPages = Math.ceil(initialResponse.pagination.items / 50);

    const randomPageNumber = Math.floor(Math.random() * totalPages) + 1;
    const pageResponse = await publicApi.labelClient.getReleasesByLabelId(
      LABEL_ID,
      {
        page: randomPageNumber,
      },
    );
    const randomRelease =
      pageResponse.releases[
        Math.floor(Math.random() * pageResponse.releases.length)
      ];

    await use(randomRelease.id);
  },
});
