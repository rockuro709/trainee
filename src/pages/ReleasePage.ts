// src/pages/ReleasePage.ts
import { BasePage } from "./BasePage";

export class ReleasePage extends BasePage {
  readonly buttons = {
    addToWantlistButton: this.page.getByText("Add to Wantlist"),
    removeFromWantlistButton: this.page.getByText("Remove from Wantlist"),
    pressedRatingButton: this.page.locator("[aria-pressed='true']"),
    removeRatingButton: this.page.getByRole("button", {
      name: "Remove Rating",
    }),
  };
  public async setRating(rating: number): Promise<void> {
    await this.page
      .getByRole("button", { name: `Rate this release ${rating} star` })
      .click();
  }

  public async getRating(): Promise<number> {
    const pressedStarsCounter = await this.buttons.pressedRatingButton.count();
    if (pressedStarsCounter === 0) {
      return 0;
    }
    const ratingString =
      await this.buttons.pressedRatingButton.getAttribute("title");
    console.log("Rating string:", ratingString);
    const rating = ratingString?.match(/[1-5]/);
    return parseInt(rating?.[0] || "0");
  }
}
