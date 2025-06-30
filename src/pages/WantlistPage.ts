// src/pages/WantlistPage.ts
import { BasePage } from "./BasePage";

export class WantlistPage extends BasePage {
  readonly buttons = {
    checkAllCheckbox: this.page.locator(".check_all"),
    removeItemsButton: this.page
      .locator('button[name="Action.RemoveItems"]')
      .first(),
    dialogOkayButton: this.page.locator(".dialog-button-okay"),
  };
}
