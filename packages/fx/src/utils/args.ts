export type RecipeCLIArgs = { [Key in string]?: string | true };

export const parseArgs = (args: string[]): { [key: string]: any } => {
  return args
    .filter((arg) => !arg.startsWith("--"))
    .reduce<RecipeCLIArgs>(
      (acc, arg) => ({
        ...acc,
        [arg.split("=")[0]]: arg.split("=")[1]
          ? JSON.parse(`"${arg.split("=")[1]}"`)
          : true,
      }),
      {}
    );
};
