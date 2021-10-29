import chalk from "chalk";
import prompts from "prompts";
import { featureGenerators } from "../config";

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
    if (!featureGenerators[featureName]) {
      console.error(`Feature ${chalk.red(featureName)} does not exist`);
      break;
    }
    console.log(`Scaffolding feature ${chalk.green(featureName)}`);
  }
}
