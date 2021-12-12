import spawn from "cross-spawn";

export const execSync = (
  command: string,
  args: string[],
  options: any = {}
) => {
  return spawn.sync(command, args, options);
};

export const exec = (
  command: string,
  args: string[],
  withStdio: boolean = true
) =>
  new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: withStdio ? "inherit" : "ignore",
      env: {
        ...process.env,
        ADBLOCK: "1",
        DISABLE_OPENCOLLECTIVE: "1",
        TS_NODE_COMPILER_OPTIONS: JSON.stringify({
          module: "commonjs",
        }),
      },
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
