import { execSync } from "child_process";
import rimraf from "rimraf";

const removeFolders = ["packages/local"];
console.log(`Removing local fx app...`, removeFolders);
removeFolders.forEach((folder) => rimraf.sync(folder));

console.log(`Installing local fx app...`);
execSync(`npx create-fx-app packages/local`);
