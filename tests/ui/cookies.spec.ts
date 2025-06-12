import { test, expect } from "@playwright/test";
import { CookieBanner } from "../../pages/components/CookieBanner";

test.beforeEach(async ({ page }) => {
  const cookieBanner = new CookieBanner(page);
  await cookieBanner.navigate("/");
  await cookieBanner.cookiesAcceptButton.click();
});

test.describe("cookies", async () => {
  test("there is no cookies", async ({ page }) => {
    const cookieBanner = new CookieBanner(page);
    await expect(cookieBanner.cookiesAcceptButton).not.toBeVisible();
  });
});
