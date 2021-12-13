import { resolve, extname } from "path";
import {
  logger,
  transformEjs,
  transformPrettier,
  getFilePaths,
  runTransforms,
  throwHandledError,
  Generator,
  GeneratorMeta,
} from "@founding/devkit";
import {
  interpolatePath,
  removeTemplateExtension,
  createContext,
} from "./context";
import { install } from "../utils/package";

export const executeGenerator = async (
  generatorInfo: GeneratorMeta,
  generator: Generator,
  generatorOptions: Record<string, any> = {},
  cliOptions: Record<string, any> = {}
) => {
  const dryRun = cliOptions.dryRun || false;
  const context = createContext();

  // Setup generator to assign props to the context
  const props = await generator.setup(context, generatorOptions);
  context.props = props;

  // Install required dependencies
  try {
    logger.log("Installing dependencies:");
    const dependencies = await generator.install(context);

    if (dependencies && dependencies.length) {
      logger.list(dependencies.map((d) => logger.withCommand(d.name)));
      if (dryRun) {
        logger.newLine();
        logger.warning("Dry run, skipping installation");
      } else {
        const spinner = logger.spinner("Installing dependencies");
        await install(context.paths.root, dependencies, false);
        spinner.succeed("Dependencies installed");
      }
    } else {
      logger.success("No dependencies to install");
    }
    logger.newLine();
  } catch (error) {
    throwHandledError({
      command: "executeGenerator",
      message: `Error installing dependencies`,
      error,
    });
  }

  // Scaffold and transform feature files
  try {
    logger.log("Generating feature source code:");
    const scaffoldPaths = await generator.scaffold(context);

    if (scaffoldPaths && scaffoldPaths.length) {
      for (const scaffoldPath of scaffoldPaths) {
        const destFilePaths = [];
        const srcFilePaths = await getFilePaths(
          interpolatePath(
            generatorInfo.localRootPath,
            scaffoldPath.src,
            context
          )
        );

        for (const srcFilePath of srcFilePaths) {
          const path = extname(scaffoldPath.dest)
            ? // If dest path is a file, copy the exact name
              scaffoldPath.dest
            : // If dest path is a directory, file could be nested
              scaffoldPath.dest + // e.g. scaffoldPath.dest = /lib/users
              removeTemplateExtension(srcFilePath) // e.g. srcFilePath = /projects/founding/fx/generators/auth/templates/lib/users/server/accountService.ts
                .replace(resolve(generatorInfo.localRootPath), "")
                .replace(scaffoldPath.src, "");

          const destPath = interpolatePath(context.paths.root, path, context);
          await runTransforms(
            { src: srcFilePath, dest: destPath },
            [transformEjs, context],
            [transformPrettier(destPath)]
          );
          destFilePaths.push(destPath);
        }

        logger.list(
          destFilePaths.map(
            (f) =>
              `Generated ${logger.withCommand(
                f.replace(context.paths.root, "")
              )}`
          )
        );
      }
      logger.success("Source files generated");
    } else {
      logger.success("No files to generate");
    }
    logger.newLine();
  } catch (error) {
    throwHandledError({
      command: "executeGenerator",
      message: `Error generating feature source code`,
      error,
    });
  }

  // Run codemods
  try {
    logger.log("Running codemods:");
    const filesModified = await generator.codemods(context);
    if (filesModified && filesModified.length) {
      logger.list(
        filesModified.map(
          (f) =>
            `Modified ${logger.withCommand(f.replace(context.paths.root, ""))}`
        )
      );
      logger.success(
        "File modifications made in order to integrate directly into your source code"
      );
    } else {
      logger.success("No codemods to run");
    }
    logger.newLine();
  } catch (error) {
    throwHandledError({
      command: "executeGenerator",
      message: `Error running codemods`,
      error,
    });
  }

  // Finish
  try {
    await generator.finish(context);
  } catch (error) {
    throwHandledError({
      command: "executeGenerator",
      message: `Error running finish`,
      error,
    });
  }
};
