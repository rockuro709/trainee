// tests/data/invalid-release-data.ts
export const invalidReleaseIds = [
  { id: -1, description: "negative number" },
  { id: 0, description: "zero" },
  { id: "abc", description: "a string" },
  { id: " ", description: "a space" },
];
