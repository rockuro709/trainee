// src/services/ReleaseService.ts
import { Web } from "../utils/Web";

export class ReleaseService {
  private readonly web: Web;

  constructor(web: Web) {
    this.web = web;
  }

  public async addReleaseToWantlist(ID: number): Promise<void> {
    await this.web.basePage.navigate(`release/${ID}`);
    await this.web.releasePage.buttons.addToWantlistButton.click();
    await this.web.releasePage.buttons.removeFromWantlistButton.waitFor({
      state: "visible",
    });
  }

  public async removeReleaseFromWantlist(ID: number): Promise<void> {
    await this.web.basePage.navigate(`release/${ID}`);
    await this.web.releasePage.buttons.removeFromWantlistButton.click();
    await this.web.releasePage.buttons.addToWantlistButton.waitFor({
      state: "visible",
    });
  }

  public async setRatingForRelease(ID: number, rating: number): Promise<void> {
    await this.web.basePage.navigate(`release/${ID}`);
    await this.web.releasePage.setRating(rating);
  }

  public async removeRatingFromRelease(ID: number): Promise<void> {
    await this.web.basePage.navigate(`release/${ID}`);
    await this.web.releasePage.buttons.removeRatingButton.click();
  }
}
