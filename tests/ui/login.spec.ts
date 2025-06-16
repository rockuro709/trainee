import { test, expect } from "@playwright/test";
import { CookieBanner } from "../../pages/components/CookieBanner";
import { IUserData } from "../../types/IUserData";
import { LoginService } from "../../services/LoginService";

//нельзя использовать beforeAll
test.beforeEach(async ({ page }) => {
  const cookieBanner = new CookieBanner(page);
  await cookieBanner.navigate("/");
  await cookieBanner.cookiesAcceptButton.click();
});

test.describe("Login", async () => {
  test("should see username field", async ({ page }) => {
    const loginService = new LoginService(page);
    const user: IUserData = {
      username: process.env.DISCOGS_USERNAME!,
      password: process.env.DISCOGS_PASSWORD!,
    };
    await loginService.login(user);
    await expect(page).toHaveTitle("Discogs - Music Database and Marketplace");
  });
});
