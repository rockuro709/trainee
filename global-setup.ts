// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
import { STORAGE_STATE_PATH } from "./playwright.config";
import fs from "fs";

async function globalSetup(config: FullConfig) {
  console.log("--- Запускается Global Setup ---");

  if (!process.env.CI && fs.existsSync(STORAGE_STATE_PATH)) {
    console.log("Найден существующий storageState.json, логин пропускается.");
    return;
  }

  const project = config.projects.find((p) => p.name === "auth-ui");
  if (!project) {
    throw new Error(
      "Проект с именем 'auth-ui' не найден в playwright.config.ts",
    );
  }

  const { storageState: _storageState, ...useOptions } = project.use;
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext(useOptions);
  const page = await context.newPage();

  try {
    console.log("Начинаю логин через UI для создания storageState...");
    await page.goto("/login");

    await page
      .locator("#onetrust-accept-btn-handler")
      .click({ timeout: 5000 })
      .catch(() => console.log("Cookie banner не найден, пропускаю."));

    await page.locator("#username").fill(process.env.DISCOGS_USERNAME!);
    await page.locator("#password").fill(process.env.DISCOGS_PASSWORD!);
    await page.locator("button[name=action]").click();

    await page.waitForURL("**/my", { timeout: 15000 });
    console.log("Логин успешен, сохраняю состояние...");

    await context.storageState({ path: STORAGE_STATE_PATH });
    console.log(`Состояние сохранено в ${STORAGE_STATE_PATH}`);
  } catch (error) {
    console.error("Ошибка в globalSetup:", error);
    throw error;
  } finally {
    await browser.close();
    console.log("Браузер в globalSetup закрыт.");
  }
}

export default globalSetup;
