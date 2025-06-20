import { test as baseTest } from "@playwright/test";
import { Web } from "../utils/Web";
import { LoginCredentials } from "../types/LoginCredentials";
import { WantlistClient } from "../clients/WantlistClient";

type MyFixtures = {
  web: Web;
  testUser: LoginCredentials;
  webLoggedIn: Web;
  wantlistClient: WantlistClient;
};

export const test = baseTest.extend<MyFixtures>({
  testUser: async ({}, use) => {
    const user: LoginCredentials = {
      username: process.env.DISCOGS_USERNAME!,
      email: process.env.DISCOGS_EMAIL!,
      password: process.env.DISCOGS_PASSWORD!,
    };
    if (!user.username || !user.password) {
      throw new Error(
        "DISCOGS_USERNAME and DISCOGS_PASSWORD must be set in .env file."
      );
    }
    await use(user);
  },

  web: async ({ page }, use) => {
    const web = new Web(page);
    await web.cookieBanner.navigate();
    await web.cookieBanner.acceptCookies();
    await use(web);
  },

  webLoggedIn: async ({ web, testUser }, use) => {
    await web.authService.login(testUser);
    await use(web);
  },

  wantlistClient: async ({ testUser, playwright }, use) => {
    const apiToken = process.env.DISCOGS_API_TOKEN;
    if (!apiToken) {
      throw new Error("DISCOGS_API_TOKEN must be set in .env file.");
    }

    //создаём апи-контекст с дополнительным хедером
    const requestContext = await playwright.request.newContext({
      baseURL: "https://api.discogs.com",
      extraHTTPHeaders: {
        Authorization: apiToken, //передача токена авторизации
        "User-Agent": "MyTraineeTestFramework/1.0",
      },
    });
    //создаём клиент с нужным контекстом
    const client = new WantlistClient(requestContext, testUser.username);
    await use(client);
    await requestContext.dispose();
  },
});
