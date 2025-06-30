// src/pages/ReleasePage.ts
import { BasePage } from "./BasePage";

export class ReleasePage extends BasePage {
  readonly buttons = {
    addToWantlistButton: this.page.getByText("Add to Wantlist"),
    removeFromWantlistButton: this.page.getByText("Remove from Wantlist"),
  };
}
