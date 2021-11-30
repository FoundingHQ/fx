import {
  normalizeGeneratorPath,
  extractGenerator,
  executeGenerator,
  removeDir,
  logger,
  getFrameworks,
  throwHandledError,
} from "@founding/devkit";

export const init = async (options: Record<string, any> = {}) => {
  const spinner = logger.spinner(`Initializing FX for your project`);
  const generatorInfo = normalizeGeneratorPath("init[dev]");
  const frameworks = getFrameworks();

  if (frameworks.length === 0 || !frameworks.includes("next")) {
    throwHandledError({
      command: "init",
      message: `FX currently does not support the framework your project is running on`,
    });
  }

  removeDir(generatorInfo.localRootPath);

  const { generator } = await extractGenerator(generatorInfo);
  spinner.succeed(
    `Framework${frameworks.length ? "s" : ""} detected: ${frameworks.join(
      ", "
    )}`
  );

  logger.success(`Scaffolding required files`);
  await executeGenerator(generatorInfo, generator, {}, options);

  removeDir(generatorInfo.localRootPath);

  logger.success(
    `${logger.withVariable(
      "Success!"
    )} Your project is now compatible with FX features`
  );
  logger.newLine();
  logger.log(`You can add features to your project with:`);
  logger.log(logger.withCommand(`npx fx add <feature>`), 1);
  logger.newLine();
};
