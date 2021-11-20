import prompts from "prompts";
import fs from "fs";
import { Generator } from "@founding/devkit";
import * as config from "./config";

type Props = {
  scopes: (keyof typeof config.paymentsScopeConfig)[];
};

const generator: Generator<Props> = {
  async setup(options = {}) {
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
  async install({ props: { scopes } }) {
    return [
      ...config.baseConfig.dependencies,
      ...scopes
        .map((scope) => config.paymentsScopeConfig[scope].dependencies)
        .flat(),
    ];
  },
  async scaffold({ props: { scopes } }) {
    return [
      ...config.baseConfig.templates,
      ...scopes
        .map((scope) => config.paymentsScopeConfig[scope].templates)
        .flat(),
    ];
  },
  async codemods() {
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
  async finish() {},
  async uninstall() {
    return {
      dependencies: config.allDependencies,
      templates: config.allTemplates,
    };
  },
};

export default generator;
