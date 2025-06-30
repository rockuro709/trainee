// tests/api/wantlist.api.spec.ts
import { test } from "../../src/fixtures/fixtures";
import { expect } from "@playwright/test";

test.describe("Wantlist API client", async () => {
  test("should add release to wantlist and remove", async ({
    api,
    randomReleaseId,
  }) => {
    //add
    const addRelease =
      await api.wantlistClient.addReleaseToWantlist(randomReleaseId);
    expect(addRelease.id).toBe(randomReleaseId);
    //check
    const wantlist = await api.wantlistClient.getWantlist();
    const foundRelease = wantlist.wants.find(
      (item) => item.id === randomReleaseId,
    );
    expect(foundRelease).toBeDefined();
    //remove
    await api.wantlistClient.removeReleaseFromWantlist(randomReleaseId);
    //check
    const wantlistAfterDelete = await api.wantlistClient.getWantlist();
    const notFoundRelease = wantlistAfterDelete.wants.find(
      (item) => item.id === randomReleaseId,
    );
    expect(notFoundRelease).toBeUndefined();
  });
});
