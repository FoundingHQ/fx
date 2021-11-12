export const baseConfig = {
  installations: {
    dependencies: ["@stripe/stripe-js", "stripe", "@stripe/react-stripe-js"],
    devDependencies: [],
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
      src: "templates/features/api/payments/webhook.ts",
      dest: "pages/api/payments/webhook.ts",
    },
  ],
};

export const paymentsScopeConfig = {
  checkout: {
    installations: {
      dependencies: [],
      devDependencies: [],
    },
    templates: [
      {
        src: "templates/features/api/payments/checkout.ts",
        dest: "pages/api/payments/checkout.ts",
      },
    ],
  },
  "custom-checkout": {
    installations: {
      dependencies: [],
      devDependencies: [],
    },
    templates: [
      {
        src: "templates/features/api/payments/create-payment-intent.ts",
        dest: "pages/api/payments/create-payment-intent.ts",
      },
    ],
  },
  subscription: {
    installations: {
      dependencies: [],
      devDependencies: [],
    },
    templates: [
      {
        src: "templates/features/api/payments/subscription/create-subscription.ts",
        dest: "pages/api/payments/subscription/create-subscription.ts",
      },
      {
        src: "templates/features/api/payments/create-payment-intent.ts",
        dest: "pages/api/payments/create-payment-intent.ts",
      },
    ],
  },
  connect: {
    installations: {
      dependencies: [],
      devDependencies: [],
    },
    templates: [
      {
        src: "templates/features/api/payments/connect/onboarding.ts",
        dest: "pages/api/payments/connect/onboarding.ts",
      },
      {
        src: "templates/features/api/payments/connect/onboarding-refresh.ts",
        dest: "pages/api/payments/connect/onboarding.ts",
      },
      {
        src: "templates/features/api/payments/create-payment-intent.ts",
        dest: "pages/api/payments/create-payment-intent.ts",
      },
    ],
  },
};

export const allDependencies = [
  ...baseConfig.installations.dependencies,
  ...baseConfig.installations.devDependencies,
  ...Object.values(paymentsScopeConfig)
    .map((c) => {
      return [
        ...c.installations.dependencies,
        ...c.installations.devDependencies,
      ];
    })
    .flat(),
];

export const allTemplates = [
  ...baseConfig.templates.map((t) => t.dest),
  ...Object.values(paymentsScopeConfig)
    .map((c) => c.templates.map((t) => t.dest))
    .flat(),
];