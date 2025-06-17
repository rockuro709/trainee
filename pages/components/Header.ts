// pages/components/HomePage.ts
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";

export class Header extends BasePage {
  readonly loginButton: Locator;
  readonly loggedInAsAriaLabel: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = page.locator("#log_in_link");
    this.loggedInAsAriaLabel = page
      .locator("#main_wrapper")
      .locator("div")
      .first()
      .getByRole("button", {
        name: /Logged in as/i,
      });
    this.logoutButton = page //надо делать композит
      .locator("#main_wrapper")
      .locator("div")
      .first()
      .locator("[href='/logout']");
  }
}
