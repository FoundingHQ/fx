/**
 * Helps setup a brand new FX project in your local environment
 * for development.
 */
import { execSync } from "child_process";
import fs from "fs";
import rimraf from "rimraf";

const localDir = "packages/local";

if (fs.existsSync(localDir)) {
  console.log("Stopping Docker containers");
  execSync(`npx lerna run --scope @founding/template docker:stop`, {
    stdio: "inherit",
  });
  console.log(`Removing local FX project...`);
  rimraf.sync(localDir);
}

console.log(`Adding new local FX project...`);
execSync(`npx create-fx-app@latest packages/local --skipInstall`, {
  stdio: "inherit",
});
