// src/services/WantlistService.ts
import { Web } from "../utils/Web";

export class WantlistService {
  private readonly web: Web;

  constructor(web: Web) {
    this.web = web;
  }

  public async removeAllReleasesFromWantlistPage(): Promise<void> {
    await this.web.basePage.navigate("mywantlist");
    await this.web.wantlistPage.buttons.checkAllCheckbox.check();
    await this.web.wantlistPage.buttons.removeItemsButton.click();
    await this.web.wantlistPage.buttons.dialogOkayButton.waitFor({
      state: "visible",
    });
    await this.web.wantlistPage.buttons.dialogOkayButton.click();
  }

  //в случае нужды можно отделить клик по чекбоксу
  public async removeReleaseFromWantlistById(releaseId: number): Promise<void> {
    await this.web.basePage.navigate("mywantlist");
    const release = this.web.wantlistPage.getReleaseRowLocatorById(releaseId);
    await release.getByRole("checkbox").check();
    await this.web.wantlistPage.buttons.removeItemsButton.click();
    await this.web.wantlistPage.buttons.dialogOkayButton.waitFor({
      state: "visible",
    });
    await this.web.wantlistPage.buttons.dialogOkayButton.click();
  }
}
