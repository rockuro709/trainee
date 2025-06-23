// src/pages/ReleasePage.ts
import { BasePage } from "./BasePage";

export class ReleasePage extends BasePage {
  readonly buttons = {
    //старый локатор ".buttons_dip1O button:nth-of-type(2)"
    addToWantlistButton: this.page.getByRole("button", {
      name: "Add to Wantlist",
    }),
    removeFromWantlistButton: this.page.getByRole("button", {
      name: "Remove from Wantlist",
    }),
  };
}
