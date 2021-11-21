import {
  chalk,
  prompts,
  getOfficialGeneratorList,
  normalizeGeneratorPath,
  GeneratorLocation,
  extractGenerator,
  executeGenerator,
  removeDir,
} from "@founding/devkit";
import { parseArgs } from "../utils/args";

export async function add(
  feature: string = "",
  args: string[] = [],
  options: Record<string, any> = {}
) {
  // Prompt user for the generator to add if they didn't specify one
  if (!feature) {
    const officialFeatures = await getOfficialGeneratorList();
    const res = await prompts({
      type: "select",
      name: "feature",
      message: "What feature would you like to add?",
      initial: 0,
      choices: officialFeatures.map((fname: string) => ({
        title: fname,
        value: fname,
      })),
    });

    if (res.feature) {
      feature = res.feature;
      console.log();
    }
  }

  if (feature.length === 0) {
    console.log();
    console.log("Please specify the feature to add:");
    console.log(`  ${chalk.cyan("npx fx add")} ${chalk.green("[feature]")}`);
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan("npx fx add")} ${chalk.green("auth")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`npx fx add --help`)} to see all options.`);
    process.exit(1);
  }

  /**
   *  Parse additional arguments from the command line:
   * `fx add example --dryrun scope=a lame --test` => { scope: 'a', lame: true }
   **/
  const generatorOptions = parseArgs(args);
  const generatorInfo = normalizeGeneratorPath(feature);

  if (generatorInfo.location === GeneratorLocation.Remote) {
    // Start off with a clean folder if we're cloning a remote generator
    removeDir(generatorInfo.localRootPath);
  }

  /**
   * Extract the generator from either:
   * - an official generator (e.g. auth)
   * - GitHub repository (e.g. "foundinghq/example-generator")
   * - Full url Github repository (e.g. "https://github.com/foundinghq/example-generator")
   * - A local file path (e.g. "./generators/example")
   *
   * The extracted generator is placed in a temporary directory (if remote)
   **/
  console.log(`Installing ${chalk.green(feature)} generator`);
  console.log();
  const { generator } = await extractGenerator(generatorInfo);
  console.log(`Generator installed`);

  console.log(`Running ${chalk.green(feature)} generator`);
  console.log();
  await executeGenerator(generatorInfo, generator, generatorOptions, options);

  if (generatorInfo.location === GeneratorLocation.Remote) {
    // Remove the temporary directory if cloned from a remote generator
    removeDir(generatorInfo.localRootPath);
  }

  console.log(
    `${chalk.green("Success!")} Your ${chalk.green(
      feature
    )} feature has been scaffolded.`
  );
}
