// src/pages/WantlistPage.ts
import { BasePage } from "./BasePage";
import { Locator } from "@playwright/test";

export class WantlistPage extends BasePage {
  readonly buttons = {
    checkAllCheckbox: this.page.locator(".check_all"),
    removeItemsButton: this.page
      .locator('button[name="Action.RemoveItems"]')
      .first(),
    dialogOkayButton: this.page.locator(".dialog-button-okay"),
  };
  public getReleaseRowLocatorById(releaseId: number): Locator {
    const allItemsInWantlist = this.page.locator('[class*="wantlist_"]');
    return allItemsInWantlist.filter({
      has: this.page.locator(`[href*="release/${releaseId}"]`),
    });
  }
}
