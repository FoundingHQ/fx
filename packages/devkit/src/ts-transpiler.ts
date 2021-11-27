import { register, REGISTER_INSTANCE } from "ts-node";

export const setupTsTranspiler = () => {
  if (!process[REGISTER_INSTANCE]) {
    register({
      compilerOptions: { module: "commonjs" },
      transpileOnly: true,
    });
  }
};
