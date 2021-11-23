/**
 * Helps setup a brand new FX project in your local environment
 * for development.
 */
import { execSync } from "child_process";
import rimraf from "rimraf";

console.log("Stopping Docker containers");
execSync(`npx lerna run --scope @founding/template docker:stop`, {
  stdio: "inherit",
});

const removeFolders = ["packages/local"];
console.log(`Removing local FX project...`, removeFolders);
removeFolders.forEach((folder) => rimraf.sync(folder));

console.log(`Adding new local FX project...`);
execSync(`npx create-fx-app@latest packages/local --skipInstall`, {
  stdio: "inherit",
});
