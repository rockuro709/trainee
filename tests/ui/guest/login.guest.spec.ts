// tests/ui/guest/login.guest.spec.ts
import { test } from "../../../src/fixtures/fixtures";
import { expect } from "@playwright/test";

test.describe("Auth", async () => {
  test("should login successfully", async ({ web, testUser }) => {
    await web.authService.login(testUser);
    await expect(web.header.loggedInAsAriaLabel).toHaveAttribute(
      "aria-label",
      `Logged in as ${testUser.username.toLowerCase()}`,
    );
  });
});
