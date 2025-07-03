// tests/ui/authenticated/wantlist.spec.ts
import { test } from "../../../src/fixtures/fixtures";
import { expect } from "@playwright/test";

test.describe("Wantlist scenarios", async () => {
  test.describe("Release is already in wantlist via API", async () => {
    test.beforeEach(async ({ api, randomReleaseId }) => {
      await api.wantlistClient.putReleaseToWantlist(randomReleaseId);
    });
    test("should delete all items via UI from wantlist page and verify via API", async ({
      webAuth,
      api,
      randomReleaseId: _randomReleaseId,
    }) => {
      await webAuth.wantlistService.removeAllReleasesFromWantlistPage();
      await expect
        .poll(
          async () => {
            const wantlist = await api.wantlistClient.getWantlist();
            return wantlist.wants.length;
          },
          {
            message: "Expected wantlist to become empty after deletion",
          },
        )
        .toBe(0);
    });
    test("should delete certain item via UI from wantlist page and verify via API", async ({
      webAuth,
      api,
      randomReleaseId,
    }) => {
      await webAuth.wantlistService.removeReleaseFromWantlistById(
        randomReleaseId,
      );
      await expect
        .poll(
          async () => {
            const wantlist = await api.wantlistClient.getWantlist();
            return wantlist.wants.find((item) => item.id === randomReleaseId);
          },
          {
            message: "Expected wantlist to become empty after deletion",
          },
        )
        .toBeUndefined();
    });
  });
});
