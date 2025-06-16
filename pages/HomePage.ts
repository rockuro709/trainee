import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export class HomePage extends BasePage {
  readonly loginButton: Locator;
  //   readonly loggedInElement: Locator;
  constructor(page: Page) {
    super(page);
    this.loginButton = page.locator("#log_in_link");
    // this.loggedInElement = page.locator("aria-label="Logged in as testuser111"");
  }
}
