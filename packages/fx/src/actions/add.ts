import chalk from "chalk";
import prompts from "prompts";
import {
  copy,
  runTransform,
  getPaths,
  install,
  getOnline,
} from "@founding/devkit";
import {
  createJscodeshiftTemplateTransform,
  createTemplateTransform,
} from "../transforms/templateTransforms";
import { config, featureGenerators } from "../config";

export async function add(
  feature: string = "",
  options: Record<string, any> = {}
) {
  if (!feature) {
    const res = await prompts({
      type: "select",
      name: "feature",
      message: "What feature would you like to add?",
      initial: 0,
      choices: Object.keys(featureGenerators).map((fname) => ({
        title: fname,
        value: fname,
      })),
    });

    if (res.feature && res.feature.length > 0) {
      feature = res.feature;
      console.log();
    }
  }

  if (feature.length === 0) {
    console.log();
    console.log("Please specify the feature to add:");
    console.log(`  ${chalk.cyan("fx add")} ${chalk.green("[feature]")}`);
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan("fx add")} ${chalk.green("auth")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`fx --help`)} to see all options.`);
    process.exit(1);
  }

  const featureGenerator = featureGenerators[feature];
  const defaultOptions = options.options || {};
  const dryRun = options.dryrun || false;

  if (!featureGenerator) {
    console.error(`Feature ${chalk.red(feature)} does not exist`);
    process.exit(1);
  } else {
    console.log(
      `Scaffolding feature ${chalk.green(feature)} ${
        Object.keys(defaultOptions).length ? "with options:" : ""
      }`
    );
    if (Object.keys(defaultOptions).length) console.log(defaultOptions);
    console.log();
  }

  // Setup generator to get environment context for other generator methods
  const context = await featureGenerator.setup(defaultOptions);

  // Install required dependencies
  try {
    const { dependencies, devDependencies } = await featureGenerator.install(
      context
    );

    if (!dependencies.length && !devDependencies.length) {
      console.log("No dependencies to install.");
      console.log();
    } else {
      const isOnline = await getOnline();
      console.log();

      if (dependencies.length) {
        console.log("Installing dependencies:");
        console.log(chalk.green(dependencies.join("\n")));
        console.log();
        if (dryRun) {
          console.log(chalk.yellow("Dry run: skipping install"));
          console.log();
        } else {
          await install(config.projectRoot, dependencies, {
            isOnline,
          });
          console.log();
        }
      }

      if (devDependencies.length) {
        console.log("Installing devDependencies:");
        console.log(chalk.green(devDependencies.join("\n")));
        console.log();
        if (dryRun) {
          console.log(chalk.yellow("Dry run: skipping install"));
          console.log();
        } else {
          await install(config.projectRoot, devDependencies, {
            devDependencies: true,
            isOnline,
          });
          console.log();
        }
      }
    }
  } catch (error) {
    console.log("Error installing dependencies:");
    console.error(error);
  }

  // Scaffold and transform feature files
  try {
    console.log("Generating feature source code");
    console.log();
    const paths = await featureGenerator.scaffold(context);
    for (const path of paths) {
      await copy(path.src, path.dest);
      const allFiles = await getPaths(path.dest);
      // TODO: Fix possible performance issue with this
      for (const file of allFiles) {
        if (file.endsWith(".ts") || file.endsWith(".tsx")) {
          const transform = createJscodeshiftTemplateTransform(context);
          await runTransform([file], transform);
        } else {
          const transform = createTemplateTransform(context);
          await runTransform([file], transform);
        }
      }
    }
  } catch (error) {
    console.log("Error creating files:");
    console.error(error);
  }

  // Run codemods
  try {
    console.log("Running codemods");
    console.log();
    await featureGenerator.codemods(context);
  } catch (error) {
    console.log("Error running codemods:");
    console.error(error);
  }

  // Finish
  await featureGenerator.finish(context);

  console.log(
    `${chalk.green("Success!")} Your ${chalk.green(
      feature
    )} feature has been scaffolded.`
  );
  console.log();
  console.log(
    `New docs have been added to the ${chalk.cyan(
      "/docs"
    )} directory. Take a look on a quick rundown of what was just scaffolded.`
  );
}
