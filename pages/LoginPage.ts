//LoginPage.ts
import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export class LoginPage extends BasePage {
  readonly usernameOrEmailField: Locator;
  readonly passwordField: Locator;
  readonly continueButton: Locator;
  constructor(page: Page) {
    super(page);
    this.usernameOrEmailField = page.locator("#username");
    this.passwordField = page.locator("#password");
    this.continueButton = page.locator(".c86834282");
  }
}
