// global-setup.ts
import { chromium, FullConfig, request } from "@playwright/test";
import {
  STORAGE_STATE_PATH,
  RELEASES_DATA_PATH,
  baseApiURL,
} from "./playwright.config";
import { LabelClient } from "./src/clients/LabelClient";
import fs from "fs";

async function globalSetup(config: FullConfig) {
  console.log("--- Global Setup is starting ---");

  if (!process.env.CI && fs.existsSync(STORAGE_STATE_PATH)) {
    console.log("Existing storageState.json is found, skip login.");
    return;
  }

  const project = config.projects.find((p) => p.name === "auth-ui");
  if (!project) {
    throw new Error("There is not project 'auth-ui' in playwright.config.ts");
  }

  const { storageState: _storageState, ...useOptions } = project.use;
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext(useOptions);
  const page = await context.newPage();

  try {
    console.log("Start loginning in through UI for storageState...");
    await page.goto("/login");

    await page.locator("#username").fill(process.env.DISCOGS_USERNAME!);
    await page.locator("#password").fill(process.env.DISCOGS_PASSWORD!);
    await page.locator("button[name=action]").click();

    await page.waitForURL("**/my", { timeout: 15000 });
    console.log("Login is succeed, save the state...");

    await context.storageState({ path: STORAGE_STATE_PATH });
    console.log(`State is saved to ${STORAGE_STATE_PATH}`);
  } catch (error) {
    console.error("Error in globalSetup:", error);
    throw error;
  } finally {
    await browser.close();
    console.log("Browser with globalSetup is closed.");
  }

  console.log("Preparing test data: receiving random releases...");
  const requestContext = await request.newContext({ baseURL: baseApiURL });
  try {
    const labelClient = new LabelClient(requestContext);
    const LABEL_ID = 2294;

    const initialResponse = await labelClient.getReleasesByLabelId(LABEL_ID, {
      per_page: 1,
    });
    const totalPages = Math.ceil(initialResponse.pagination.items / 50);
    const randomPageNumber = Math.floor(Math.random() * totalPages) + 1;
    const pageResponse = await labelClient.getReleasesByLabelId(LABEL_ID, {
      page: randomPageNumber,
    });

    fs.writeFileSync(
      RELEASES_DATA_PATH,
      JSON.stringify(pageResponse.releases, null, 2),
    );
    console.log(`Releases data is saved to ${RELEASES_DATA_PATH}`);
  } finally {
    await requestContext.dispose();
  }
}

export default globalSetup;
