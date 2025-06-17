// tests/ui/login.spec.ts
import { test } from "../../fixtures/fixtures";
import { expect } from "@playwright/test";

test.describe("Auth", async () => {
  test("should login successfully", async ({ web, page, testUser }) => {
    await web.authService.login(testUser);
    await expect(web.header.loggedInAsAriaLabel).toHaveAttribute(
      "aria-label",
      `Logged in as ${testUser.username.toLowerCase()}`
    );
  });
  test("should logout successfully", async ({ web, loggedInPage }) => {
    await web.authService.logout();
    await expect(web.header.loginButton).toBeVisible();
  });
});
