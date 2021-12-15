import { resolve, extname } from "path";
import {
  prompts,
  logger,
  transformEjs,
  transformPrettier,
  getFilePaths,
  runTransforms,
  writeFile,
  throwHandledError,
  Generator,
  GeneratorMeta,
  Context,
} from "@founding/devkit";
import {
  interpolate,
  removeTemplateExtension,
  createContext,
  readAttributes,
} from "./context";
import { install } from "../utils/package";

const executeSetupGenerator = async (
  generator: Generator,
  generatorOptions: Record<string, any> = {},
  generatorMeta: GeneratorMeta
) => {
  const context = createContext();
  context.generatorMeta = generatorMeta;

  // Setup generator to assign props to the context
  const props = await generator.setup(context, generatorOptions);
  context.props = props;
  context.p = props;

  return context;
};

const executeInstallDependencies = async (
  generator: Generator,
  context: Context,
  dryRun: boolean
) => {
  logger.log("Installing dependencies:");
  const dependencies = await generator.install(context);

  if (!dependencies || !dependencies.length) {
    logger.success("No dependencies to install");
    logger.newLine();
    return;
  }

  logger.list(dependencies.map((d) => logger.withCommand(d.name)));
  if (dryRun) {
    logger.newLine();
    logger.warning("Dry run, skipping installation");
  } else {
    const spinner = logger.spinner("Installing dependencies");
    await install(context.paths.root, dependencies, false);
    spinner.succeed("Dependencies installed");
  }

  logger.success("No dependencies to install");
  logger.newLine();
};

const executeScaffolds = async (
  generator: Generator,
  context: Context,
  generatorMeta: GeneratorMeta,
  force: boolean
) => {
  logger.log("Generating feature source code:");
  const scaffoldPaths = await generator.scaffold(context);
  const destFilePaths = [];
  const skippedFiles = [];

  if (!scaffoldPaths || !scaffoldPaths.length) {
    logger.success("No files to generate");
    logger.newLine();
    return;
  }

  for (const scaffoldPath of scaffoldPaths) {
    const srcFilePaths = await getFilePaths(
      resolve(generatorMeta.localRootPath, scaffoldPath.src)
    );

    for (const srcFilePath of srcFilePaths) {
      // srcFilePath = /projects/founding/fx/generators/auth/templates/lib/users/api/accountService.ts.ejs
      const path = extname(scaffoldPath.dest)
        ? // If dest path is a file, copy the exact name
          scaffoldPath.dest
        : // If dest path is a directory, file could be nested
          scaffoldPath.dest + // ./
          removeTemplateExtension(srcFilePath)
            .replace(resolve(generatorMeta.localRootPath) + "/", "") // /Users/kaiyuhsu/Documents/projects/founding/fx/generators/auth
            .replace(scaffoldPath.src + "/", ""); // templates/next

      const destFilePath = resolve(
        context.paths.root,
        interpolate(path, context)
      );
      const readableDestFilePath = destFilePath.replace(context.paths.root, "");

      // Transform source file and read metadata
      const { attributes, body } = readAttributes(
        (await runTransforms({ src: srcFilePath }, [
          transformEjs,
          context,
        ])) as string
      );

      const source = await transformPrettier(destFilePath)(body);

      if (attributes.filter) {
        try {
          writeFile(destFilePath, source, {
            force: force || attributes.force,
            append: attributes.inject && attributes.append,
          });
          destFilePaths.push(readableDestFilePath);
        } catch {
          const res = await prompts({
            type: "confirm",
            name: "force",
            message: `${readableDestFilePath} file already exists, would you like to overwrite it?`,
            initial: true,
          });

          if (res.force) {
            writeFile(destFilePath, source, { force: true });
            destFilePaths.push(readableDestFilePath);
          } else {
            skippedFiles.push(readableDestFilePath);
          }
        }
      }
    }
  }

  destFilePaths.length &&
    logger.list(destFilePaths.map((f) => `Generated ${logger.withCommand(f)}`));
  skippedFiles.length &&
    logger.list(
      skippedFiles.map((f) => logger.withWarning(`Skipped generation of ${f}`))
    );
  logger.success("Source files generated");
  logger.newLine();
};

const executeCodemods = async (generator: Generator, context: Context) => {
  logger.log("Running codemods:");
  const filesModified = await generator.codemods(context);

  if (!filesModified || !filesModified.length) {
    logger.success("No codemods to run");
    logger.newLine();
    return;
  }

  logger.list(
    filesModified.map(
      (f) => `Modified ${logger.withCommand(f.replace(context.paths.root, ""))}`
    )
  );
  logger.success(
    "File modifications made in order to integrate directly into your source code"
  );
  logger.newLine();
};

const executeFinish = async (generator: Generator, context: Context) => {
  await generator.finish(context);
};

export const executeGenerator = async (
  generatorMeta: GeneratorMeta,
  generator: Generator,
  generatorOptions: Record<string, any> = {},
  cliOptions: Record<string, any> = {}
) => {
  const dryRun = cliOptions.dryRun || false;
  const force = cliOptions.force || false;
  const context = await executeSetupGenerator(
    generator,
    generatorOptions,
    generatorMeta
  );

  try {
    await executeInstallDependencies(generator, context, dryRun);
    await executeScaffolds(generator, context, generatorMeta, force);
    await executeCodemods(generator, context);
  } catch (error) {
    throwHandledError({
      command: "executeGenerator",
      message: `Error running execution step`,
      error,
    });
  }

  await executeFinish(generator, context);
};
