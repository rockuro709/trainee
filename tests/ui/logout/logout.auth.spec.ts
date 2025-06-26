// tests/ui/logout/logout.auth.spec.ts
import { test } from "../../../src/fixtures/fixtures";
import { expect } from "@playwright/test";

test.describe("Auth", async () => {
  test("should logout successfully", async ({ webLoggedIn }) => {
    await webLoggedIn.authService.logout();
    await expect(webLoggedIn.header.buttons.loginButton).toBeVisible();
  });
});
