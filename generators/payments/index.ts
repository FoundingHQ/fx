import merge from "merge-deep";
import { Generator, readJson, writeJson, prompts } from "@founding/devkit";
import * as config from "./config";

type Props = {
  stack?: keyof typeof config.paymentsStackConfig;
  connect?: keyof typeof config.paymentsConnectConfig;
  account?: keyof typeof config.paymentsAccountConfig;
  type?: (keyof typeof config.paymentsTypeConfig)[];
  catalog?: (keyof typeof config.paymentsCatalogConfig)[];
};

const generator: Generator<Props> = {
  async setup(_context, options: Props = {}) {
    const res = await prompts([
      // {
      //   type: () => (options.stack ? null : "select"),
      //   name: "stack",
      //   message: "Which part of the stack do you want to generate?",
      //   choices: [
      //     {
      //       title: "Full stack",
      //       description: "Generate UI and API",
      //       value: "fullstack",
      //     },
      //     {
      //       title: "API",
      //       description: "Generate only the API",
      //       value: "api",
      //     },
      //   ],
      // },
      {
        type: () => (options.connect ? null : "select"),
        name: "connect",
        message: "Are you managing a single account or multiple accounts?",
        choices: [
          {
            title: "Single party",
            description: "Manage my own Stripe account",
            value: "single",
          },
          {
            title: "Multi party",
            description: "Manage other Stripe accounts with my own account",
            value: "connect",
          },
        ],
      },
      {
        type: (prev: "single" | any) => (prev === "single" ? null : "select"),
        name: "account",
        message: "What kind of Stripe connect accounts will your users have?",
        choices: [
          {
            title: "Standard account",
            description: "Build a marketplace (Shopify, Substack)",
            value: "standard",
          },
          {
            title: "Express account",
            description: "Build a software platform (Lyft, Instacart)",
            value: "express",
          },
        ],
      },
      {
        type: () =>
          options.type && options.type.length ? null : "multiselect",
        name: "type",
        message: "Is it a one time payment or is there a recurring aspect?",
        min: 1,
        choices: [
          {
            title: "Single",
            description: "One time transaction (Tshirt, Lifetime Deal)",
            value: "single",
            selected: true,
          },
          {
            title: "Subscription",
            description: "Recurring revenue ($99 a month)",
            value: "subscription",
          },
        ],
      },
      {
        type: () =>
          options.catalog && options.catalog.length ? null : "multiselect",
        name: "catalog",
        message: "How much customization and reliance on Stripe do you want?",
        min: 1,
        choices: [
          {
            title: "Stripe",
            description: "Use Stripe Checkout and product catalog",
            value: "checkout",
            selected: true,
          },
          {
            title: "Custom",
            description:
              "Customize checkout experience and manage product with database",
            value: "custom",
          },
        ],
      },
    ]);

    return { ...res, ...options };
  },
  async install({ props: { connect, account, type, catalog } }) {
    return [
      ...config.baseConfig.dependencies,
      ...(connect ? config.paymentsConnectConfig[connect].dependencies : []),
      ...(account ? config.paymentsAccountConfig[account].dependencies : []),
      ...(type
        ? type.map((t) => config.paymentsTypeConfig[t].dependencies).flat()
        : []),
      ...(catalog
        ? catalog
            .map((c) => config.paymentsCatalogConfig[c].dependencies)
            .flat()
        : []),
    ];
  },
  async scaffold({ props: { connect, account, type, catalog } }) {
    return [
      ...config.baseConfig.templates,
      ...(connect ? config.paymentsConnectConfig[connect].templates : []),
      ...(account ? config.paymentsAccountConfig[account].templates : []),
      ...(type
        ? type.map((t) => config.paymentsTypeConfig[t].templates).flat()
        : []),
      ...(catalog
        ? catalog.map((c) => config.paymentsCatalogConfig[c].templates).flat()
        : []),
    ];
  },
  async codemods({ paths }) {
    // const appJson = readJson(paths.appJson);
    // const newAppJson = merge(appJson, {
    //   expo: {
    //     plugins: [
    //       [
    //         "@stripe/stripe-react-native",
    //         {
    //           merchantIdentifier: "",
    //           enableGooglePay: true,
    //         },
    //       ],
    //     ],
    //   },
    // });
    // writeJson("app.json", newAppJson);
    return [];
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
