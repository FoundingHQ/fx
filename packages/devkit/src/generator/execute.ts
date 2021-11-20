import chalk from "chalk";
import {
  convertTemplateDestPaths,
  convertTemplateSrcPaths,
  createContext,
} from "../context";
import { getEjsTransform } from "../ejs";
import { copy, getFiles, runTransforms } from "../fs";
import { install } from "../package";
import { getPrettierTransform } from "../prettier";
import { throwHandledError } from "../error";
import { Generator, GeneratorMeta } from "./types";

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
    const dependencies = await generator.install(context);

    if (!dependencies.length) {
      console.log("No dependencies to install.");
      console.log();
    } else {
      console.log();

      if (dependencies.length) {
        console.log("Installing dependencies:");
        dependencies.forEach((d) => {
          console.log(`▶ ${chalk.green(d.name)}`);
        });
        if (dryRun) {
          console.log();
          console.log(chalk.yellow("Dry run: skipping install"));
          console.log();
        } else {
          await install(context.paths.root, dependencies);
          console.log();
        }
      }
    }
  } catch (error) {
    throwHandledError({
      command: "executeGenerator",
      message: `Error installing dependencies`,
      error,
    });
  }

  // Scaffold and transform feature files
  try {
    console.log("Generating feature source code");
    console.log();
    const scaffoldPaths = await generator.scaffold(context);
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
        console.log(
          `▶ Generated ${chalk.green(filePath.replace(context.paths.root, ""))}`
        );
        await runTransforms(
          filePath,
          [getEjsTransform(filePath), context],
          [getPrettierTransform(filePath)]
        );
      }
    }
    console.log();
  } catch (error) {
    throwHandledError({
      command: "executeGenerator",
      message: `Error generating feature source code`,
      error,
    });
  }

  // Run codemods
  try {
    console.log("Running codemods");
    console.log();
    await generator.codemods(context);
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
