import { cwd } from "process";
import { resolve } from "path";

// Import your feature generators:
import * as authGenerator from "./generators/auth";
import * as paymentsGenerator from "./generators/payments";

type Generator = {
  setup: () => any;
  install: (config: any) => any;
  scaffold: (config: any) => any;
  onComplete: (config: any) => any;
};

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
