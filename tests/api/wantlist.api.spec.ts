// tests/api/wantlistClient.spec.ts
import { test } from "../../src/fixtures/fixtures";
import { expect } from "@playwright/test";

const RELEASE_ID = 6698369;

test.describe("Wantlist API client", async () => {
  test("should add release to wantlist and remove", async ({ api }) => {
    //add
    const addRelease =
      await api.wantlistClient.addReleaseToWantlist(RELEASE_ID);
    expect(addRelease.id).toBe(RELEASE_ID);
    //check
    const wantlist = await api.wantlistClient.getWantlist();
    const foundRelease = wantlist.wants.find((item) => item.id === RELEASE_ID);
    expect(foundRelease).toBeDefined();
    //remove
    await api.wantlistClient.removeReleaseFromWantlist(RELEASE_ID);
    //check
    const wantlistAfterDelete = await api.wantlistClient.getWantlist();
    const notFoundRelease = wantlistAfterDelete.wants.find(
      (item) => item.id === RELEASE_ID,
    );
    expect(notFoundRelease).toBeUndefined();
  });
});
