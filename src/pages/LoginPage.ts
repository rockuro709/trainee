// pages/LoginPage.ts
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly buttons = {
    continueButton: this.page.locator("[type='submit'][name='action']"),
  };

  readonly fields = {
    usernameOrEmailField: this.page.locator("#username"),
    passwordField: this.page.locator("#password"),
  };
}
