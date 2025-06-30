// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
import { STORAGE_STATE_PATH } from "./playwright.config";
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
}

export default globalSetup;
