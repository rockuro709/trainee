// utils/Web.ts
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CookieBanner } from "../pages/components/CookieBanner";
import { AuthService } from "../services/AuthService";
import { Header } from "../pages/components/Header";

/**
 * @description Единый менеджер для всех Page Objects и Services.
 * Позволяет получать доступ к ним через одну точку.
 */
export class Web {
  public readonly loginPage: LoginPage;
  public readonly cookieBanner: CookieBanner;
  public readonly authService: AuthService;
  public readonly header: Header;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.cookieBanner = new CookieBanner(page);
    this.authService = new AuthService(page, this);
    this.header = new Header(page);
  }
}
