import { cwd } from "process";
import { resolve } from "path";

// Import your feature generators:
import * as authGenerator from "./generators/auth";
import * as paymentsGenerator from "./generators/payments";

// Export it for use in the CLI:
export const featureGenerators = {
  // { Feature name: generator module }
  auth: authGenerator,
  payments: paymentsGenerator,
};

export const config = {
  cliRoot: resolve(__dirname, "../"),
  projectRoot: cwd(),
};
