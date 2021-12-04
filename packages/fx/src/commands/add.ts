import {
  prompts,
  getOfficialGeneratorList,
  normalizeGeneratorPath,
  GeneratorLocation,
  extractGenerator,
  executeGenerator,
  removeDir,
  logger,
} from "@founding/devkit";
import { parseArgs } from "../utils/args";

export const add = async (
  feature: string = "",
  args: string[] = [],
  options: Record<string, any> = {}
) => {
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
      logger.newLine();
    }
  }

  if (feature.length === 0) {
    logger.newLine();
    logger.log("Please specify the feature to add:");
    logger.log(
      `${logger.withCommand("npx fx add")} ${logger.withVariable("[feature]")}`,
      1
    );
    logger.newLine();
    logger.log("For example:");
    logger.log(
      `${logger.withCommand("npx fx add")} ${logger.withVariable("auth")}`,
      1
    );
    logger.newLine();
    logger.log(
      `Run ${logger.withCommand(`npx fx add --help`)} to see all options.`
    );
    process.exit(1);
  }

  /**
   *  Parse additional arguments from the command line:
   * `fx add example --dry-run scope=a lame --test`
   * => { scope: 'a', lame: true }
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
  const generatorName = logger.withVariable(feature);
  const spinner = logger.spinner(`Installing ${generatorName} generator`);
  const { generator } = await extractGenerator(generatorInfo);
  spinner.succeed(`Generator installed`);

  logger.success(`Running ${generatorName} generator`);
  logger.newLine();
  await executeGenerator(generatorInfo, generator, generatorOptions, options);

  if (generatorInfo.location === GeneratorLocation.Remote) {
    // Remove the temporary directory if cloned from a remote generator
    removeDir(generatorInfo.localRootPath);
  }

  logger.success(
    `${logger.withVariable("Success!")} Your ${logger.withVariable(
      feature
    )} feature has been scaffolded.`
  );
  logger.newLine();
};
