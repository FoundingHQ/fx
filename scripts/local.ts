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

const originalCwd = process.cwd();

console.log(`Adding new local FX project...`);
process.chdir("packages");
execSync(`npx create-next-app@latest local --ts --use-npm`, {
  stdio: "inherit",
});

process.chdir("local");
console.log(`Adding FX into project...`);
execSync(`npm i @founding/fx -D`, {
  stdio: "inherit",
});

process.chdir(originalCwd);
console.log(`Linking local files...`);
execSync(`npm run reset:links`, {
  stdio: "inherit",
});

process.chdir("packages/local");
console.log(`Running FX init...`);
execSync(`npx fx init`, {
  stdio: "inherit",
});

process.chdir(originalCwd);
console.log(`Re-link local files after fx init`);
execSync(`npm run reset:links`, {
  stdio: "inherit",
});

console.log(`Done`);
