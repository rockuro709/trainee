// src/fixtures/fixtures.ts
import { test as baseTest } from "@playwright/test";
import { Web } from "../utils/Web";
import { LoginCredentials } from "../types/LoginCredentials.type";
import { baseApiURL } from "../../playwright.config";
import { ClientManager } from "../clients/ClientManager";
import { PublicClientManager } from "../clients/PublicClientManager";
import fs from "fs";
import { Release } from "../types/api/label.schema";
import { RELEASES_DATA_PATH } from "../../playwright.config";

type MyFixtures = {
  testUser: LoginCredentials;
  web: Web;
  webAuth: Web;
  webLoggedIn: Web;
  api: ClientManager;
  publicApi: PublicClientManager;
  allLabelReleases: Release[];
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
        "User-Agent": "MyPetProjectTestFramework/1.0",
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
        "User-Agent": "MyPetProjectTestFramework/1.0",
      },
    });

    const publicClientManager = new PublicClientManager(context);
    await use(publicClientManager);

    await context.dispose();
  },

  allLabelReleases: async ({}, use) => {
    const data = fs.readFileSync(RELEASES_DATA_PATH, "utf-8");
    const releases: Release[] = JSON.parse(data);
    await use(releases);
  },

  randomReleaseId: async ({ allLabelReleases }, use) => {
    const randomRelease =
      allLabelReleases[Math.floor(Math.random() * allLabelReleases.length)];
    await use(randomRelease.id);
  },
});
