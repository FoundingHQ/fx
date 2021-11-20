import prompts from "prompts";
import fs from "fs";
import { Generator } from "@founding/devkit";
import {
  baseConfig,
  allDependencies,
  allTemplates,
  paymentsScopeConfig,
} from "./paymentsConfig";

type Config = {
  scopes: (keyof typeof paymentsScopeConfig)[];
};

const generator: Generator<Config> = {
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
  install: async ({ scopes }) => {
    return [
      ...baseConfig.dependencies,
      ...scopes.map((scope) => paymentsScopeConfig[scope].dependencies).flat(),
    ];
  },
  scaffold: async ({ scopes }) => {
    return [
      ...baseConfig.templates,
      ...scopes.map((scope) => paymentsScopeConfig[scope].templates).flat(),
    ];
  },
  codemods: async (_config) => {
    const source = fs.readFileSync("app.json", "utf8");
    const appJson = JSON.parse(source);
    const newAppJson = {
      ...appJson,
      ["expo"]: {
        ...appJson["expo"],
        ["plugins"]: [
          ...(appJson["expo"]["plugins"] || []),
          [
            "@stripe/stripe-react-native",
            {
              merchantIdentifier: "",
              enableGooglePay: true,
            },
          ],
        ],
      },
    };
    fs.writeFile("app.json", JSON.stringify(newAppJson, null, 2), (err) => {
      if (err) {
        throw {
          command: "add",
          message: "Failed to write to app.json",
        };
      }
    });

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
};

export default generator;
