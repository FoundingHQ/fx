import chalk from "chalk";
import fs from "fs-extra";
import globby from "globby";
import path from "path";
import rimraf from "rimraf";

export const isFolderEmpty = (root: string, name: string) => {
  const validFiles = [
    ".DS_Store",
    ".git",
    ".gitattributes",
    ".gitignore",
    ".gitlab-ci.yml",
    ".hg",
    ".hgcheck",
    ".hgignore",
    ".idea",
    ".npmignore",
    ".travis.yml",
    "LICENSE",
    "Thumbs.db",
    "docs",
    "mkdocs.yml",
    "npm-debug.log",
    "yarn-debug.log",
    "yarn-error.log",
  ];

  const conflicts = fs
    .readdirSync(root)
    .filter((file) => !validFiles.includes(file))
    // Support IntelliJ IDEA-based editors
    .filter((file) => !/\.iml$/.test(file));

  if (conflicts.length > 0) {
    console.log(
      `The directory ${chalk.green(name)} contains files that could conflict:`
    );
    console.log();
    for (const file of conflicts) {
      try {
        const stats = fs.lstatSync(path.join(root, file));
        if (stats.isDirectory()) {
          console.log(`  ${chalk.blue(file)}/`);
        } else {
          console.log(`  ${file}`);
        }
      } catch {
        console.log(`  ${file}`);
      }
    }
    console.log();
    console.log(
      "Either try using a new directory name, or remove the files listed above."
    );
    console.log();
    return false;
  }

  return true;
};

export const makeDir = (root: string, options = { recursive: true }) =>
  fs.promises.mkdir(root, options);

export const removeDir = (path: string) => rimraf.sync(path);

export const isWriteable = async (directory: string) => {
  try {
    await fs.promises.access(directory, (fs.constants || fs).W_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export const getFiles = (patterns: string, options?: globby.GlobbyOptions) =>
  globby(patterns, options);

export const copy = (source: string, destination: string) =>
  fs.copy(source, destination);

export const readJson = (...args: Parameters<typeof fs.readJsonSync>) =>
  fs.readJsonSync(...args);

export const writeJson = (...args: Parameters<typeof fs.writeJsonSync>) =>
  fs.writeJsonSync(...args);

export const readFile = (filePath: string) => fs.readFileSync(filePath, "utf8");

export const writeFile = (filePath: string, content: string) =>
  fs.writeFileSync(filePath, content);

type Transform = (source: string, context: any) => Promise<string | void>;

export const runTransforms = async (
  filePath: string,
  ...transforms: [Transform, any?][]
) => {
  let source = fs.readFileSync(filePath, "utf8");
  for (const [transform, context] of transforms) {
    const transformed = await transform(source, context);
    if (transformed) source = transformed;
  }
  return fs.writeFile(filePath, source);
};
