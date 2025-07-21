// tests/api/release.api.spec.ts
import { test } from "../../src/fixtures/fixtures";
import { expect } from "@playwright/test";
import { invalidReleaseIds } from "../invalid-release-data";

// тесты иногда падают из-за Too Many Requests (429)
test.describe.skip("Release API Positive and Negative Scenarios", () => {
  invalidReleaseIds.forEach((testCase) => {
    test(`should return 404 for invalid ID: ${testCase.description}`, async ({
      publicApi,
    }) => {
      await expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        publicApi.releaseClient.getReleaseById(testCase.id as any), // `as any` нужен, чтобы тайпскрипт пропустил нечисловой ID
      ).rejects.toThrow(
        // rejects.toThrow ожидает что наш базовый метод sendApiRequest
        // вернёт ошибку 404 и описание ошибки, которое мы сами описали
        /API request failed: 404 Not Found/,
      );
    });
  });
  for (let i = 0; i < 5; i++) {
    test(`should get a valid release info for random release #${i + 1}`, async ({
      publicApi,
      randomReleaseId,
    }) => {
      const release =
        await publicApi.releaseClient.getReleaseById(randomReleaseId);
      expect(release.id).toBe(randomReleaseId);
    });
  }
});
