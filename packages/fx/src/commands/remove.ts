import { execSync } from "child_process";
import {
  chalk,
  prompts,
  getOfficialGeneratorList,
  removeDir,
} from "@founding/devkit";

export async function remove(
  feature: string = "",
  options: Record<string, any> = {}
) {
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
      console.log();
    }
  }

  if (feature.length === 0) {
    console.log();
    console.log("Please specify the feature to remove:");
    console.log(`  ${chalk.cyan("fx remove")} ${chalk.green("[feature]")}`);
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan("fx remove")} ${chalk.green("auth")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`fx --help`)} to see all options.`);
    process.exit(1);
  }

  console.log("Not implemented yet");

  // const featureGenerator = featureGenerators[feature];
  // const dryRun = options.dryrun || false;

  // if (!featureGenerator) {
  //   console.error(`Feature ${chalk.red(feature)} does not exist`);
  //   process.exit(1);
  // } else {
  //   console.log(`Removing ${chalk.cyan(feature)} feature from project`);
  //   console.log();
  // }

  // const { dependencies, templates } = await featureGenerator.uninstall();

  // // Uninstall dependencies
  // if (dependencies.length) {
  //   try {
  //     console.log("Uninstalling dependencies:");
  //     console.log(chalk.green(dependencies.join("\n")));
  //     console.log();
  //     if (dryRun) {
  //       console.log(chalk.yellow("Dry run: skipping install"));
  //     } else {
  //       execSync(`npm uninstall ${dependencies.join(" ")}`);
  //     }
  //   } catch (error) {
  //     console.log("Error uninstalling dependencies:");
  //     console.error(error);
  //   }
  // } else {
  //   console.log(`No dependencies to uninstall`);
  //   console.log();
  // }

  // if (templates.length) {
  //   try {
  //     console.log("Removing feature source code");
  //     console.log();
  //     if (dryRun) {
  //       console.log(chalk.yellow("Dry run: skipping source removal"));
  //       console.log("Paths to remove:");
  //       console.log(templates);
  //     } else {
  //       for (const path of templates) {
  //         removeDir(path);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Error removing files:");
  //     console.error(error);
  //   }
  // } else {
  //   console.log("No source code to remove");
  //   console.log();
  // }

  // console.log(
  //   `${chalk.yellow(
  //     "Warning"
  //   )}: Removing features can be risky when features depend on one another. Changes and codemods ran on your source code have not been reverted. Please refer back to the commit where you installed a feature and manually check the diff.`
  // );
}
