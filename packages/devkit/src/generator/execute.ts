import { logger } from "../logger";
import {
  convertTemplateDestPaths,
  convertTemplateSrcPaths,
  createContext,
} from "../context";
import { getEjsTransform } from "../ejs";
import { copy, getFiles, runTransforms } from "../fs";
import { install } from "../package";
import { throwHandledError } from "../error";
import { Generator, GeneratorMeta } from "./types";

export const executeGenerator = async (
  generatorInfo: GeneratorMeta,
  generator: Generator,
  generatorOptions: Record<string, any> = {},
  cliOptions: Record<string, any> = {}
) => {
  const dryRun = cliOptions.dryrun || false;
  const context = createContext();

  // Setup generator to assign props to the context
  const props = await generator.setup(context, generatorOptions);
  context.props = props;

  // Install required dependencies
  try {
    logger.log("Installing dependencies:");
    const dependencies = await generator.install(context);

    if (dependencies && dependencies.length) {
      logger.list(dependencies.map((d) => logger.withVariable(d.name)));
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
        const src = convertTemplateSrcPaths(
          generatorInfo.localRootPath,
          scaffoldPath.src,
          context
        );
        const dest = convertTemplateDestPaths(
          context.paths.root,
          scaffoldPath.dest,
          context
        );

        await copy(src, dest);

        const files = await getFiles(dest);
        // TODO: Fix possible performance issue with this
        for (const filePath of files) {
          await runTransforms(filePath, [getEjsTransform(filePath), context]);
        }
        logger.list(
          files.map(
            (f) =>
              `Generated ${logger.withVariable(
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
      logger.list(filesModified);
      logger.success("Feature has been integrated into your source code");
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
  await generator.finish(context);
};
