//src/pages/components/CookieBanner.ts
import { BasePage } from "../BasePage";

export class CookieBanner extends BasePage {
  readonly cookiesAcceptButton = this.page.locator(
    "button#onetrust-accept-btn-handler",
  );

  async acceptCookies() {
    await this.cookiesAcceptButton.click();
    await this.cookiesAcceptButton.waitFor({ state: "hidden" });
  }
}
