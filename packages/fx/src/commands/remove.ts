import {
  prompts,
  getOfficialGeneratorList,
  normalizeGeneratorPath,
  GeneratorLocation,
  extractGenerator,
  removeDir,
  logger,
  uninstall,
} from "@founding/devkit";

export const remove = async (
  feature: string = "",
  options: Record<string, any> = {}
) => {
  if (!feature) {
    const officialFeatures = await getOfficialGeneratorList();
    const res = await prompts({
      type: "select",
      name: "feature",
      message: "What feature would you like to remove?",
      initial: 0,
      choices: officialFeatures.map((fname: string) => ({
        title: fname,
        value: fname,
      })),
    });

    if (res.feature && res.feature.length > 0) {
      feature = res.feature;
      logger.newLine();
    }
  }

  if (feature.length === 0) {
    logger.newLine();
    logger.log("Please specify the feature to remove:");
    logger.log(
      `${logger.withCommand("npx fx remove")} ${logger.withVariable(
        "[feature]"
      )}`,
      1
    );
    logger.newLine();
    logger.log("For example:");
    logger.log(
      `${logger.withCommand("npx fx remove")} ${logger.withVariable("auth")}`,
      1
    );
    logger.newLine();
    logger.log(
      `Run ${logger.withCommand(`npx fx remove --help`)} to see all options.`
    );
    process.exit(1);
  }

  const spinner = logger.spinner(`Removing ${feature} feature from project`);
  const dryRun = options.dryrun || false;
  const generatorInfo = normalizeGeneratorPath(feature);

  if (generatorInfo.location === GeneratorLocation.Remote) {
    removeDir(generatorInfo.localRootPath);
  }

  const { generator } = await extractGenerator(generatorInfo);
  const { dependencies, templates } = await generator.uninstall();

  spinner.stop();

  if (dependencies.length) {
    try {
      logger.log("Uninstalling dependencies:");
      logger.log(dependencies.map((d) => logger.withCaret(d)).join("\n"));
      if (dryRun) {
        logger.warning("Dry run: skipping uninstall");
      } else {
        spinner.start("Uninstalling dependencies");
        await uninstall(process.cwd(), dependencies, false);
        spinner.stop();
      }
      logger.newLine();
    } catch (error: any) {
      logger.error("Error uninstalling dependencies:");
      logger.error(error);
    }
  } else {
    logger.success(`No dependencies to uninstall`);
    logger.newLine();
  }

  if (templates.length) {
    try {
      logger.log("Removing feature source code:");
      logger.log(templates.map((t) => logger.withCaret(t)).join("\n"));
      if (dryRun) {
        logger.warning("Dry run: skipping source removal");
      } else {
        spinner.start("Removing feature source code");
        for (const path of templates) {
          removeDir(path);
        }
        spinner.stop();
      }
      logger.newLine();
    } catch (error: any) {
      logger.error("Error removing files:");
      logger.error(error);
    }
  } else {
    logger.success("No source code to remove");
    logger.newLine();
  }

  if (generatorInfo.location === GeneratorLocation.Remote) {
    removeDir(generatorInfo.localRootPath);
  }

  logger.warning(
    `Removing features can be risky when features depend on one another. Changes and codemods ran on your source code have not been reverted. Please refer back to the commit where you installed a feature and manually check the diff.`
  );
  logger.newLine();
  spinner.succeed(
    `${logger.withVariable("Success!")} Feature successfully removed`
  );
  logger.newLine();
};
