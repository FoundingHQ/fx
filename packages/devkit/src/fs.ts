import chalk from "chalk";
import fs from "fs-extra";
import globby from "globby";
import path from "path";
import rimraf from "rimraf";

export function isFolderEmpty(root: string, name: string): boolean {
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
}

export async function makeDir(root: string, options = { recursive: true }) {
  return fs.promises.mkdir(root, options);
}

export function removeDir(path: string) {
  return rimraf.sync(path);
}

export async function isWriteable(directory: string): Promise<boolean> {
  try {
    await fs.promises.access(directory, (fs.constants || fs).W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export async function copy(source: string, destination: string) {
  return fs.copy(source, destination);
}

export async function runTransforms(
  filePath: string,
  transforms: ((source: string, context: any) => Promise<string>)[],
  context: any = {}
) {
  let source = fs.readFileSync(filePath, "utf8");
  for (const [index, transform] of transforms.entries()) {
    if (Array.isArray(context) && context[index]) {
      source = await transform(source, context[index]);
    } else {
      source = await transform(source, context);
    }
  }
  return fs.writeFile(filePath, source);
}

export async function getFiles(
  patterns: string,
  options?: globby.GlobbyOptions
) {
  return globby(patterns, options);
}