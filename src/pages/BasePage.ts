// src/pages/BasePage.ts
import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async navigate(endpoint: string = "/") {
    await this.page.goto(endpoint);
  }
}
