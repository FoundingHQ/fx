import { cwd } from "process";
import { resolve } from "path";
import { Generator } from "./types";

// Import your feature generators:
import authGenerator from "./generators/auth";
import paymentsGenerator from "./generators/payments";

// Export it for use in the CLI:
export const featureGenerators = {
  // { Feature name: generator module }
  auth: authGenerator,
  payments: paymentsGenerator,
} as Record<string, Generator>;

export const config = {
  cliRoot: resolve(__dirname, "../"),
  projectRoot: cwd(),
};
