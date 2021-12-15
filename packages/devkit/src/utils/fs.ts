import fs from "fs-extra";
import globby from "globby";
import rimraf from "rimraf";

export const isWriteable = async (directory: string) => {
  try {
    await fs.promises.access(directory, (fs.constants || fs).W_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export const makeDir = (root: string, options = { recursive: true }) =>
  fs.mkdirSync(root, options);

export const removeDir = (path: string) => rimraf.sync(path);

export const getFilePaths = (
  patterns: string,
  options?: globby.GlobbyOptions
) => globby(patterns, options);

export const copyFiles = (source: string, destination: string) =>
  fs.copy(source, destination);

export const fileExists = (path: string) => fs.existsSync(path);

export const readJson = (...args: Parameters<typeof fs.readJsonSync>) =>
  fs.readJsonSync(...args);

export const writeJson = (...args: Parameters<typeof fs.writeJsonSync>) =>
  fs.outputJSONSync(...args);

export const readFile = (filePath: string) => fs.readFileSync(filePath, "utf8");

export const writeFile = (
  filePath: string,
  content: string,
  options: { force?: boolean; append?: boolean } = {
    force: false,
    append: false,
  }
) => {
  const exists = fs.existsSync(filePath);
  if (exists && options.append) {
    return fs.appendFileSync(filePath, content);
  }
  if (!exists || (exists && options.force)) {
    return fs.outputFileSync(filePath, content);
  }
  throw new Error(`Cannot write file to ${filePath}`);
};

type Path = { src: string; dest?: string };
type Transform = (source: string, context: any) => Promise<string | void>;

export const runTransforms = async (
  filePath: Path | string,
  ...transforms: [Transform, any?][]
) => {
  const isStringPath = typeof filePath === "string";
  const sourcePath = isStringPath ? filePath : filePath.src;
  const destinationPath = isStringPath ? filePath : filePath.dest;
  let source = fs.readFileSync(sourcePath, "utf8");

  for (const [transform, context] of transforms) {
    const transformed = await transform(source, context);
    if (transformed) source = transformed;
  }

  if (destinationPath) {
    return fs.outputFile(destinationPath, source);
  }

  return source;
};
