import { Page, Locator } from "@playwright/test";
import BasePage from "../BasePage";

export class CookieBanner extends BasePage {
  readonly cookiesAcceptButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cookiesAcceptButton = page.locator(
      "button#onetrust-accept-btn-handler"
    );
  }
}
