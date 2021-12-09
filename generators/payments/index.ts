import { Generator, prompts } from "@founding/devkit";
import * as config from "./config";

type Props = {
  catalog?: (keyof typeof config.paymentsCatalogConfig)[];
};

const generator: Generator<Props> = {
  async setup(_context, options: Props = {}) {
    const res = await prompts([
      {
        type: () =>
          options.catalog && options.catalog.length ? null : "multiselect",
        name: "catalog",
        message: "Do you want to use Stripe Checkout UI or create your own?",
        min: 1,
        choices: [
          {
            title: "Stripe Checkout",
            description: "Use Stripe Checkout and product catalog",
            value: "checkout",
            selected: true,
          },
          {
            title: "Custom Checkout",
            description:
              "Customize checkout experience and manage product with database",
            value: "custom",
          },
        ],
      },
    ]);

    return { ...res, ...options };
  },
  async install({ props: { catalog } }) {
    return [
      ...config.baseConfig.dependencies,
      ...(catalog
        ? catalog
            .map((c) => config.paymentsCatalogConfig[c].dependencies)
            .flat()
        : []),
    ];
  },
  async scaffold({ props: { catalog } }) {
    return [
      ...config.baseConfig.templates,
      ...(catalog
        ? catalog.map((c) => config.paymentsCatalogConfig[c].templates).flat()
        : []),
    ];
  },
  async codemods() {
    return null;
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
