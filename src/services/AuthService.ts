// services/AuthService.ts
import { Page } from "@playwright/test";
import { LoginCredentials } from "../types/LoginCredentials";
import { Web } from "../utils/Web";

export class AuthService {
  private readonly page: Page;
  private readonly web: Web;

  constructor(page: Page, web: Web) {
    this.page = page;
    this.web = web;
  }

  public async login(user: LoginCredentials): Promise<void> {
    await this.web.header.buttons.loginButton.click();
    await this.web.loginPage.fields.usernameOrEmailField.fill(user.username);
    await this.web.loginPage.fields.passwordField.fill(user.password);
    await this.web.loginPage.buttons.continueButton.click();
  }
  public async logout(): Promise<void> {
    await this.web.header.loggedInAsAriaLabel.click();
    await this.web.header.buttons.logoutButton.click();
  }
}
