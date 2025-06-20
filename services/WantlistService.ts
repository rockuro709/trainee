// services/WantlistService.ts
import { Page } from "@playwright/test";
import { Web } from "../utils/Web";

export class WantlistService {
  private readonly page: Page;
  private readonly web: Web;

  constructor(page: Page, web: Web) {
    this.page = page;
    this.web = web;
  }

  public async addReleaseToWantlist(ID: number): Promise<void> {
    await this.web.basePage.navigate(`release/${ID}`);
    await this.web.releasePage.buttons.addToWantlistButton.click();
  }

  public async removeReleaseFromWantlist(ID: number): Promise<void> {
    await this.web.basePage.navigate(`release/${ID}`);
    await this.web.releasePage.buttons.removeFromWantlistButton.click();
  }
}
