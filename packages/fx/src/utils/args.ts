export type RecipeCLIArgs = { [Key in string]?: string | true | string[] };

export const parseArgs = (args: string[]): { [key: string]: any } => {
  return args
    .filter((arg) => !arg.startsWith("--"))
    .reduce<RecipeCLIArgs>((acc, arg) => {
      const [key, value] = arg.split("=");
      // Allow for duplicate keys, they will be merged as an array
      if (acc[key]) {
        if (Array.isArray(acc[key])) {
          (acc[key] as string[]).push(value);
        } else {
          acc[key] = [acc[key] as string, value];
        }
      } else {
        // If the key is not already set, set it as a json
        acc[key] = value ? JSON.parse(`"${value}"`) : true;
      }
      return acc;
    }, {});
};
