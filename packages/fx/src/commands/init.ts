import {
  normalizeGeneratorPath,
  extractGenerator,
  executeGenerator,
  removeDir,
  logger,
} from "@founding/devkit";

export const init = async (options: Record<string, any> = {}) => {
  const spinner = logger.spinner(`Initializing project`);
  const generatorInfo = normalizeGeneratorPath("init[dev]");

  removeDir(generatorInfo.localRootPath);

  const { generator } = await extractGenerator(generatorInfo);
  await executeGenerator(generatorInfo, generator, {}, options);

  removeDir(generatorInfo.localRootPath);

  spinner.succeed(`Project installed`);
};
