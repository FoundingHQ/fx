import { cwd } from "process";
import { resolve } from "path";

export const config = {
  cliRoot: resolve(__dirname, "../"),
  projectRoot: cwd(),
};
