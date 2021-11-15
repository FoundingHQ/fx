/**
 * Helps setup a brand new fx app in your local environment for development.
 */
import { execSync } from "child_process";
import rimraf from "rimraf";

const removeFolders = ["packages/local"];
console.log(`Removing local fx app...`, removeFolders);
removeFolders.forEach((folder) => rimraf.sync(folder));

console.log(`Adding new local fx app...`);
execSync(`npx create-fx-app@latest packages/local --skipInstall`, {
  stdio: "inherit",
});
