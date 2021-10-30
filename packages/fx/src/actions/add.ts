import chalk from "chalk";
import prompts from "prompts";
import { copy, install, getOnline } from "@founding/devkit";
import { config, featureGenerators } from "../config";

export async function add(featureList: string[] = []) {
  if (featureList.length === 0) {
    const res = await prompts({
      type: "multiselect",
      name: "featureList",
      message: "What features would you like to add?",
      initial: "auth",
      choices: Object.keys(featureGenerators).map((fname) => ({
        title: fname,
        value: fname,
      })),
    });

    if (res.featureList && res.featureList.length > 0) {
      featureList = res.featureList;
    }
  }

  if (featureList.length === 0) {
    console.log();
    console.log("Please specify the feature to add:");
    console.log(`  ${chalk.cyan("fx add")} ${chalk.green("[feature...]")}`);
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan("fx add")} ${chalk.green("auth")}`);
    console.log(`  ${chalk.cyan("fx add")} ${chalk.green("auth payments")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`fx --help`)} to see all options.`);
    process.exit(1);
  }

  for (const featureName of featureList) {
    const featureGenerator = featureGenerators[featureName];
    if (!featureGenerator) {
      console.error(`Feature ${chalk.red(featureName)} does not exist`);
      break;
    }
    console.log(`Scaffolding feature ${chalk.green(featureName)}`);
    console.log();

    // Setup generator to get environment context for other generator methods
    const context = await featureGenerator.setup();

    // Install required dependencies
    try {
      const { dependencies, devDependencies } = await featureGenerator.install(
        context
      );
      const isOnline = await getOnline();

      if (dependencies.length || devDependencies.length) {
        console.log(
          "Installing required dependencies. This might take a couple of minutes."
        );
        console.log();
      } else {
        console.log("No dependencies to install.");
        console.log();
      }

      if (dependencies.length) {
        await install(config.projectRoot, dependencies, {
          isOnline,
        });
      }

      if (devDependencies.length) {
        await install(config.projectRoot, devDependencies, {
          devDependencies: true,
          isOnline,
        });
      }
    } catch (error) {
      console.log("Error installing dependencies:");
      console.error(error);
    }

    // Copy feature files
    try {
      console.log("Copying feature files");
      console.log();
      const paths = await featureGenerator.scaffold(context);
      for (const path of paths) {
        await copy(path.src, path.dest);
      }
    } catch (error) {
      console.log("Error copying files:");
      console.error(error);
    }

    // Run codemods
    try {
      console.log("Running codemods");
      console.log();
    } catch (error) {
      console.log("Error running codemods:");
      console.error(error);
    }

    // Finish
    await featureGenerator.finish(context);

    console.log(`Feature ${chalk.green(featureName)} scaffolded`);
    console.log();
  }

  console.log(
    `${chalk.green("Success!")}. Your features have been scaffolded.`
  );
  console.log(
    `New docs have been added to the ${chalk.bold(
      "/docs"
    )} directory which document the features you've scaffolded`
  );
}
