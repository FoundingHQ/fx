import merge from "merge-deep";
import { Generator, readJson, writeJson, prompts } from "@founding/devkit";
import * as config from "./config";

type Props = {
  scopes: (keyof typeof config.paymentsScopeConfig)[];
};

const generator: Generator<Props> = {
  async setup(_context, options = {}) {
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
  async codemods({ paths }) {
    const appJson = readJson(paths.appJson);
    const newAppJson = merge(appJson, {
      expo: {
        plugins: [
          [
            "@stripe/stripe-react-native",
            {
              merchantIdentifier: "",
              enableGooglePay: true,
            },
          ],
        ],
      },
    });
    writeJson("app.json", newAppJson);
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
