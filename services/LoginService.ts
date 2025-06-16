import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { IUserData } from "../types/IUserData";

export class LoginService {
  private readonly page: Page;
  private readonly homePage: HomePage;
  private readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
  }

  public async login(user: IUserData): Promise<void> {
    await this.homePage.loginButton.click();
    await this.loginPage.usernameOrEmailField.fill(user.username!);
    await this.loginPage.passwordField.fill(user.password);
    await this.loginPage.continueButton.click();
  }
}
