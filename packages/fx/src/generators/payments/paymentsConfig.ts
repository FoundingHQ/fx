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
    {
      src: "templates/features/payments/data",
      dest: "lib/payments/data",
    },
    {
      src: "templates/features/payments/util",
      dest: "lib/payments/util",
    },
    {
      src: "templates/features/pages/payments/success.tsx",
      dest: "pages/payments/success.tsx",
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
      {
        src: "templates/features/pages/payments/checkout.tsx",
        dest: "pages/payments/checkout.tsx",
      },
      {
        src: "templates/features/payments/components/Checkout.tsx",
        dest: "lib/payments/components/Checkout.tsx",
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
      {
        src: "templates/features/pages/payments/custom-checkout.tsx",
        dest: "pages/payments/custom-checkout.tsx",
      },
      {
        src: "templates/features/payments/components/CustomCheckout.tsx",
        dest: "lib/payments/components/CustomCheckout.tsx",
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
      {
        src: "templates/features/pages/payments/subscription.tsx",
        dest: "pages/payments/subscription.tsx",
      },
      {
        src: "templates/features/payments/components/Subscription.tsx",
        dest: "lib/payments/components/Subscription.tsx",
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
        dest: "pages/api/payments/connect/onboarding-refresh.ts",
      },
      {
        src: "templates/features/api/payments/connect/onboarding-refresh.ts",
        dest: "pages/api/payments/connect/onboarding.ts",
      },
      {
        src: "templates/features/api/payments/create-payment-intent.ts",
        dest: "pages/api/payments/create-payment-intent.ts",
      },
      {
        src: "templates/features/pages/payments/connect.tsx",
        dest: "pages/payments/connect.tsx",
      },
      {
        src: "templates/features/payments/components/ConnectCheckout.tsx",
        dest: "lib/payments/components/ConnectCheckout.tsx",
      },
      {
        src: "templates/features/payments/components/ConnectOnboarding.tsx",
        dest: "lib/payments/components/ConnectOnboarding.tsx",
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
