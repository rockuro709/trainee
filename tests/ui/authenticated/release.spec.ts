// tests/ui/authenticated/release.spec.ts
import { test } from "../../../src/fixtures/fixtures";
import { expect } from "@playwright/test";

test.describe("Release scenarios", async () => {
  test.describe("Adding/removing release to/from wantlists", async () => {
    test.describe("Release is not in wantlist", async () => {
      test("should add item via UI and verify via API", async ({
        webAuth,
        api,
        randomReleaseId,
      }) => {
        await webAuth.releaseService.addReleaseToWantlist(randomReleaseId);
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
      await api.wantlistClient
        .deleteReleaseFromWantlist(randomReleaseId)
        .catch(() => {}); //не упадёт, если нечего удалять
    });
    test.describe("Release is already in wantlist via API", async () => {
      test.beforeEach(async ({ api, randomReleaseId }) => {
        await api.wantlistClient.putReleaseToWantlist(randomReleaseId);
      });

      test("should delete item via UI and verify via API", async ({
        webAuth,
        api,
        randomReleaseId,
      }) => {
        await webAuth.releaseService.removeReleaseFromWantlist(randomReleaseId);
        await expect //утилс для экспектов
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
  test.describe("Release rating operations", async () => {
    //лишний дескрайб или оставить?
    test.describe("Release is not rated", async () => {
      test("should set and verify rating for a release", async ({
        webAuth,
        randomReleaseId,
      }) => {
        const randomRating = Math.floor(Math.random() * 5) + 1;
        await webAuth.releaseService.setRatingForRelease(
          randomReleaseId,
          randomRating,
        );
        const rating = await webAuth.releasePage.getRating();
        expect(rating).toBe(randomRating);
      });
    });
    test.describe("Release is already rated", async () => {
      test.beforeEach(async ({ api, randomReleaseId }) => {
        await api.releaseRatingByUserClient.putRatingForReleaseByUser(
          randomReleaseId,
          5, //СДЕЛАТЬ РАНДОМ РЕЙТИНГ или не надо
        );
      });
      test("should remove rating via UI", async ({
        webAuth,
        randomReleaseId,
      }) => {
        await webAuth.releaseService.removeRatingFromRelease(randomReleaseId);
        const rating = await webAuth.releasePage.getRating();
        expect(rating).toBe(0);
      });
    });
    test.afterEach(async ({ api, randomReleaseId }) => {
      await api.releaseRatingByUserClient.deleteRatingForReleaseByUser(
        randomReleaseId,
      );
    });
  });
});
