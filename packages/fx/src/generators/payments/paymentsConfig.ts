export const baseConfig = {
  installations: {
    dependencies: [],
    devDependencies: ["@stripe/stripe-js", "stripe"],
  },
  templates: [
    {
      src: "templates/features/payments/server/paymentsConfig.ts",
      dest: "lib/payments/server/paymentsConfig.ts",
    },
    {
      src: "templates/features/payments/server/paymentsService.ts",
      dest: "lib/payments/server/paymentsService.ts",
    },
    {
      src: "templates/features/api/payments/checkout.ts",
      dest: "pages/api/payments/checkout.ts",
    },
    {
      src: "templates/features/api/payments/connect.ts",
      dest: "pages/api/payments/connect.ts",
    },
    {
      src: "templates/features/api/payments/customCheckout.ts",
      dest: "pages/api/payments/customCheckout.ts",
    },
    {
      src: "templates/features/api/payments/subscription.ts",
      dest: "pages/api/payments/subscription.ts",
    },
    {
      src: "templates/features/api/payments/webhook.ts",
      dest: "pages/api/payments/webhook.ts",
    },
  ],
};

export const allDependencies = [
  ...baseConfig.installations.dependencies,
  ...baseConfig.installations.devDependencies,
];

export const allTemplates = [...baseConfig.templates.map((t) => t.dest)];
