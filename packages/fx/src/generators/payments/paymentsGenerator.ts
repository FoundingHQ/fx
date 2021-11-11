import prompts from "prompts";
import { Generator } from "../../types";
import { baseConfig, allDependencies, allTemplates } from "./paymentsConfig";

type Config = {
  scopes: (keyof typeof baseConfig)[];
};

export default {
  setup: async (options = {}) => {
    const res = await prompts([
      {
        type: () =>
          options.scopes && options.scopes.length ? null : "multiselect",
        name: "scopes",
        message: "What type of payment strategies would you like to add?",
        min: 1,
        choices: [
          {
            title: "Checkout",
            description: "Prebuilt Checkout page from Stripe",
            value: "checkout",
            selected: true,
          },
          {
            title: "Custom Checkout",
            description: "Custom UI with integration with Stripe API",
            value: "custom-checkout",
            selected: false,
          },
          {
            title: "Subscription",
            description: "Create recurring payments",
            value: "subscription",
            selected: false,
          },
          {
            title: "Connect",
            description: "Manage other Stripe accounts",
            value: "connect",
            selected: false,
          },
        ],
      },
    ]);

    return { ...res, ...options };
  },
  install: async (_config) => {
    return {
      dependencies: [...baseConfig.installations.dependencies],
      devDependencies: [...baseConfig.installations.devDependencies],
    };
  },
  scaffold: async (_config) => {
    return [...baseConfig.templates];
  },
  codemods: async (_config) => {
    return;
  },
  finish: async (_config) => {
    return;
  },
  uninstall: async () => {
    return {
      dependencies: allDependencies,
      templates: allTemplates,
    };
  },
} as Generator<Config>;
