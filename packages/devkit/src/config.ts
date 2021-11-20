import { join } from "path";

export const GH_ROOT = "https://github.com";
export const API_ROOT = "https://api.github.com/repos";
export const RAW_ROOT = "https://raw.githubusercontent.com";
export const CODE_ROOT = "https://codeload.github.com";

export const cwd = process.cwd();

export const FX_PROJECT_PATHS = {
  projectRoot: cwd,
  projectConfig: join(cwd, "fxconfig.json"),
  projectPackageJson: join(cwd, "package.json"),
  generatorRoot: join(cwd, ".fx"),
  generatorPackageJson: join(cwd, ".fx", "package.json"),
};
