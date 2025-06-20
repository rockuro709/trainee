// pages/components/HomePage.ts
import { BasePage } from "../BasePage";

export class Header extends BasePage {
  readonly shadowHost = this.page
    .locator("#main_wrapper")
    .locator("div")
    .first();

  readonly buttons = {
    loginButton: this.page.locator("#log_in_link"),
    logoutButton: this.shadowHost.locator("[href='/logout']"),
    wantlistButton: this.shadowHost.locator("[href='/mywantlist']"),
  };

  readonly loggedInAsAriaLabel = this.shadowHost.getByRole("button", {
    name: /Logged in as/i,
  });
}
