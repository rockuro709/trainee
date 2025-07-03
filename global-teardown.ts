// global-teardown.ts
import fs from "fs";
import { STORAGE_STATE_PATH, RELEASES_DATA_PATH } from "./playwright.config";

async function globalTeardown() {
  console.log("--- Global Teardown is starting ---");

  try {
    if (fs.existsSync(STORAGE_STATE_PATH)) {
      fs.unlinkSync(STORAGE_STATE_PATH);
      console.log(`File ${STORAGE_STATE_PATH} is deleted.`);
    }

    if (fs.existsSync(RELEASES_DATA_PATH)) {
      fs.unlinkSync(RELEASES_DATA_PATH);
      console.log(`File ${RELEASES_DATA_PATH} is deleted.`);
    }
  } catch (error) {
    console.error("Error during cleaning in globalTeardown:", error);
  }
}

export default globalTeardown;
