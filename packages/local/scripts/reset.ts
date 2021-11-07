import { execSync } from "child_process";
import rimraf from "rimraf";
import packageJson from "../package.json";

const removeFolders = ["lib", "pages", "my-app"];
console.log(`Removing folders:`, removeFolders);
removeFolders.forEach((folder) => rimraf.sync(folder));

const uninstallDevDep = Object.keys(packageJson.devDependencies || {});
// @ts-ignore
const uninstallDep = Object.keys(packageJson.dependencies || {});

const keepDeps = ["@founding/fx", "create-fx-app", "@types/rimraf", "rimraf"];
const deps = [...uninstallDevDep, ...uninstallDep].filter((dep) => {
  return !keepDeps.includes(dep);
});

if (deps.length) {
  console.log(`Uninstalling dependencies:`, deps);
  execSync(`npm uninstall ${deps.join(" ")}`);
}
