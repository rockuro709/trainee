//login.spec.ts
import { test, expect } from "@playwright/test";
import { CookieBanner } from "../../pages/components/CookieBanner";
import { LoginCredentials } from "../../types/LoginCredentials";
import { AuthService } from "../../services/AuthService";

//нельзя использовать beforeAll
test.beforeEach(async ({ page }) => {
  const cookieBanner = new CookieBanner(page);
  await cookieBanner.navigate("/");
  await cookieBanner.cookiesAcceptButton.click();
});

test.describe("Login", async () => {
  test("should see username field", async ({ page }) => {
    const authService = new AuthService(page);
    //fixture для юзера
    const user: LoginCredentials = {
      username: process.env.DISCOGS_USERNAME!,
      password: process.env.DISCOGS_PASSWORD!,
    };
    await authService.login(user);
    await expect(page).toHaveTitle("Discogs - Music Database and Marketplace");
  });
});
