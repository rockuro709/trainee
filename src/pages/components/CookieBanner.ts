//src/pages/components/CookieBanner.ts
import { BasePage } from "../BasePage";

export class CookieBanner extends BasePage {
  readonly cookiesAcceptButton = this.page.locator(
    "button#onetrust-accept-btn-handler",
  );

  async acceptCookies() {
    if (await this.cookiesAcceptButton.isVisible({ timeout: 3000 })) {
      console.log("Cookie banner is found. Accepting...");
      await this.cookiesAcceptButton.click();
      await this.cookiesAcceptButton.waitFor({ state: "hidden" });
    } else {
      console.log("Cookie banner is not found or was accepted, skipping.");
    }
  }
}
