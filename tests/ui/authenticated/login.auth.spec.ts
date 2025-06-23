// tests/ui/authenticated/login.auth.spec.ts
import { test } from "../../../src/fixtures/fixtures";
import { expect } from "@playwright/test";

test.describe.only("Auth", async () => {
  test("should logout successfully", async ({ web }) => {
    await web.authService.logout();
    await expect(web.header.buttons.loginButton).toBeVisible();
  });
});
