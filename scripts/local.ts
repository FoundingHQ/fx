/**
 * Helps setup a brand new FX project in your local environment
 * for development.
 */
import { execSync } from "child_process";
import fs from "fs";
import rimraf from "rimraf";

const originalCwd = process.cwd();
const localDir = "packages/local";

if (fs.existsSync(localDir)) {
  console.log("Stopping Docker containers");
  process.chdir(localDir);
  execSync("docker-compose down", { stdio: "inherit" });
  process.chdir(originalCwd);

  console.log(`Removing local FX project...`);
  rimraf.sync(localDir);
}

console.log(`Adding new local FX project...`);
process.chdir("packages");
execSync(`npx create-next-app@latest local --ts --use-npm`, {
  stdio: "inherit",
});

process.chdir("local");
console.log(`Adding FX into local project...`);
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
execSync(`npx fx init -p ../../generators/init\[dev\]/index.ts`, {
  stdio: "inherit",
});

process.chdir(originalCwd);
console.log(`Re-link local files after fx init`);
execSync(`npm run reset:links`, {
  stdio: "inherit",
});

console.log(`Done`);
