// tests/ui/authenticated/wantlist.spec.ts
import { test } from "../../../src/fixtures/fixtures";
import { expect } from "@playwright/test";

test.describe("Wantlist scenarios with UI and API", async () => {
  test.describe("Release is not in wantlist", async () => {
    test("should add item via UI and verify via API", async ({
      webAuth,
      api,
      randomReleaseId,
    }) => {
      await webAuth.wantlistService.addReleaseToWantlist(randomReleaseId);
      await expect
        .poll(async () => {
          const wantlist = await api.wantlistClient.getWantlist();
          const addedRelease = wantlist.wants.find(
            (item) => item.id === randomReleaseId,
          );
          return addedRelease;
        })
        .toBeDefined();
    });
  });
  test.afterEach(async ({ api, randomReleaseId }) => {
    await api.wantlistClient.removeReleaseFromWantlist(randomReleaseId);
  });
});
test.describe("Release is already in wantlist via API", async () => {
  test.beforeEach(async ({ api, randomReleaseId }) => {
    await api.wantlistClient.addReleaseToWantlist(randomReleaseId);
  });
  test("should delete all items via UI from wantlist page and verify via API", async ({
    webAuth,
    api,
    randomReleaseId: _randomReleaseId,
  }) => {
    await webAuth.wantlistService.removeAllReleaseFromWantlistPage();
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

  test("should delete item via UI and verify via API", async ({
    webAuth,
    api,
    randomReleaseId,
  }) => {
    await webAuth.wantlistService.removeReleaseFromWantlist(randomReleaseId);
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
});
