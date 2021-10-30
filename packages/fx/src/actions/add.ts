import chalk from "chalk";
import prompts from "prompts";
import { copy, install, getOnline } from "@founding/devkit";
import { config, featureGenerators } from "../config";

export async function add(feature: string = "") {
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
  if (!featureGenerator) {
    console.error(`Feature ${chalk.red(feature)} does not exist`);
    process.exit(1);
  }
  console.log(`Scaffolding feature ${chalk.green(feature)}`);
  console.log();

  // Setup generator to get environment context for other generator methods
  const context = await featureGenerator.setup();

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

      if (dependencies.length) {
        console.log("Installing dependencies: ", dependencies.join(", "));
        await install(config.projectRoot, dependencies, {
          isOnline,
        });
      }

      if (devDependencies.length) {
        console.log("Installing devDependencies: ", dependencies.join(", "));
        await install(config.projectRoot, devDependencies, {
          devDependencies: true,
          isOnline,
        });
      }
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
