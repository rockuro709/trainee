// tests/ui/authenticated/wantlist.spec.ts
import { test } from "../../../src/fixtures/fixtures";
import { expect } from "@playwright/test";

const RELEASE_ID = 6698369;
//const RELEASE_TITLE = "Lovers On The Sun";

test.describe("Wantlist scenarios with UI and API", async () => {
  test.describe("Release is not in wantlist", async () => {
    test("should add item via UI and verify via API", async ({
      webAuth,
      api,
    }) => {
      await webAuth.wantlistService.addReleaseToWantlist(RELEASE_ID);
      //race condition
      await expect
        .poll(async () => {
          const wantlist = await api.wantlistClient.getWantlist();
          const addedRelease = wantlist.wants.find(
            (item) => item.id === RELEASE_ID,
          );
          return addedRelease;
        })
        .toBeDefined();
    });
  });
  test.afterEach(async ({ api }) => {
    await api.wantlistClient.removeReleaseFromWantlist(RELEASE_ID);
  });
});
test.describe("Release is already in wantlist via API", async () => {
  test.beforeEach(async ({ api }) => {
    await api.wantlistClient.addReleaseToWantlist(RELEASE_ID);
  });
  test("should delete item via UI and verify via API", async ({
    webAuth,
    api,
  }) => {
    await webAuth.wantlistService.removeReleaseFromWantlist(RELEASE_ID);
    //race condition
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
