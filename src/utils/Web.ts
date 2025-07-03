// src/utils/Web.ts
import { Page } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { LoginPage } from "../pages/LoginPage";
import { CookieBanner } from "../pages/components/CookieBanner";
import { AuthService } from "../services/AuthService";
import { Header } from "../pages/components/Header";
import { ReleasePage } from "../pages/ReleasePage";
import { WantlistService } from "../services/WantlistService";
import { WantlistPage } from "../pages/WantlistPage";
import { ReleaseService } from "../services/ReleaseService";

/**
 * @description Единый менеджер для всех Page Objects и Services.
 * Позволяет получать доступ к ним через одну точку.
 */
export class Web {
  public readonly basePage: BasePage;
  public readonly loginPage: LoginPage;
  public readonly cookieBanner: CookieBanner;
  public readonly authService: AuthService;
  public readonly header: Header;
  public readonly releasePage: ReleasePage;
  public readonly wantlistService: WantlistService;
  public readonly wantlistPage: WantlistPage;
  public readonly releaseService: ReleaseService;

  constructor(page: Page) {
    this.basePage = new BasePage(page);
    this.loginPage = new LoginPage(page);
    this.cookieBanner = new CookieBanner(page);
    this.authService = new AuthService(this);
    this.header = new Header(page);
    this.releasePage = new ReleasePage(page);
    this.wantlistService = new WantlistService(this);
    this.wantlistPage = new WantlistPage(page);
    this.releaseService = new ReleaseService(this);
  }
}
