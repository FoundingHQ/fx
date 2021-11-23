import { REGISTER_INSTANCE } from "ts-node";

export const setupTsnode = () => {
  if (!process[REGISTER_INSTANCE]) {
    require("ts-node").register({
      compilerOptions: { module: "commonjs" },
      transpileOnly: true,
    });
  }
};
