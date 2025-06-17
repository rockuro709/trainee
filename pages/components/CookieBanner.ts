// pages/components/CookieBanner.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CookieBanner extends BasePage {
  readonly cookiesAcceptButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cookiesAcceptButton = page.locator(
      "button#onetrust-accept-btn-handler"
    );
  }
  async acceptCookies() {
    await this.cookiesAcceptButton.click();
    await this.cookiesAcceptButton.waitFor({ state: "hidden" });
  }
}
