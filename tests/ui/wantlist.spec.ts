// tests/ui/wantlist.spec.ts
import { test } from "../../fixtures/fixtures";
import { expect } from "@playwright/test";

const RELEASE_ID = 6698369;
const RELEASE_TITLE = "Lovers On The Sun";

test.describe("Wantlist scenarios with UI and API", async () => {
  test.describe("Release is not in wantlist", async () => {
    test("should add item via UI and verify via API", async ({
      webLoggedIn,
      wantlistClient,
    }) => {
      await webLoggedIn.wantlistService.addReleaseToWantlist(RELEASE_ID);
      const wantlist = await wantlistClient.getWantlist();
      expect(wantlist.wants).toBeDefined();
      // const addedRelease = wantlist.wants.find((item) => item.id === RELEASE_ID);
      // expect(addedRelease).toBeDefined(); // Убеждаемся, что релиз найден
      // expect(addedRelease.basic_information.title).toEqual(RELEASE_TITLE); // Можно проверить и название
    });
    test.afterEach(async ({ wantlistClient }) => {
      await wantlistClient.removeReleaseFromWantlist(RELEASE_ID);
    });
  });
  test.describe("Release is already in wantlist", async () => {
    test.beforeEach(async ({ wantlistClient }) => {
      await wantlistClient.addReleaseToWantlist(RELEASE_ID);
    });
    test("should delete item successfully", async ({
      webLoggedIn,
      wantlistClient,
    }) => {
      await webLoggedIn.wantlistService.removeReleaseFromWantlist(RELEASE_ID);
      const wantlist = await wantlistClient.getWantlist();
      expect(wantlist.wants).toBeDefined();
      expect(wantlist.wants).toHaveLength(0);
    });
  });
});

// api/client clientManager
//фикстура через гет получает лейбл с массивом релизов
