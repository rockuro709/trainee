//global-setup.ts
import { chromium } from "@playwright/test";
import fs from "fs";

export const STORAGE_STATE_PATH = "./storageState.json";

async function globalSetup() {
  if (fs.existsSync(STORAGE_STATE_PATH)) {
    console.log("Файл состояния найден, логин пропускается.");
    return;
  }
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const continueButton = page.locator("button[name=action]");
  await page.goto("https://www.discogs.com/login");
  await page.fill("#username", process.env.DISCOGS_USERNAME!);
  await page.fill("#password", process.env.DISCOGS_PASSWORD!);
  await continueButton.click();
  await page.waitForURL("https://www.discogs.com/my");
  await page.context().storageState({ path: STORAGE_STATE_PATH as string });
  await browser.close();
}
export default globalSetup;
