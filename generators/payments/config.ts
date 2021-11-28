import { GeneratorConfigDefinition } from "@founding/devkit";

export const baseConfig: GeneratorConfigDefinition = {
  dependencies: [
    { name: "@stripe/stripe-js" },
    { name: "stripe" },
    { name: "@stripe/stripe-react-native", isExpoDep: true },
  ],
  templates: [
    {
      src: "templates/lib/payments/server/paymentsConfig.ts",
      dest: "lib/payments/server/paymentsConfig.ts",
    },
    {
      src: "templates/lib/payments/server/paymentsService.ts",
      dest: "lib/payments/server/paymentsService.ts",
    },
    {
      src: "templates/pages/api/payments/webhook.ts",
      dest: "pages/api/payments/webhook.ts",
    },
    {
      src: "templates/lib/payments/data",
      dest: "lib/payments/data",
    },
    {
      src: "templates/lib/payments/util",
      dest: "lib/payments/util",
    },
    {
      src: "templates/pages/payments/success.tsx",
      dest: "pages/payments/success.tsx",
    },
  ],
};

export const paymentsStackConfig = {
  fullstack: {
    dependencies: [],
    templates: [],
  },
  api: {
    dependencies: [],
    templates: [],
  },
};

export const paymentsConnectConfig = {
  single: {
    dependencies: [],
    templates: [],
  },
  connect: {
    dependencies: [],
    templates: [
      {
        src: "templates/pages/api/payments/connect/onboarding.ts",
        dest: "pages/api/payments/connect/onboarding.ts",
      },
      {
        src: "templates/pages/api/payments/connect/onboarding-refresh.ts",
        dest: "pages/api/payments/connect/onboarding-refresh.ts",
      },
      {
        src: "templates/pages/api/payments/connect/onboarding-refresh.ts",
        dest: "pages/api/payments/connect/onboarding.ts",
      },
      {
        src: "templates/pages/api/payments/create-payment-intent.ts",
        dest: "pages/api/payments/create-payment-intent.ts",
      },
      {
        src: "templates/pages/payments/connect.tsx",
        dest: "pages/payments/connect.tsx",
      },
      {
        src: "templates/lib/payments/components/ConnectCheckout.tsx",
        dest: "lib/payments/components/ConnectCheckout.tsx",
      },
      {
        src: "templates/lib/payments/components/ConnectOnboarding.tsx",
        dest: "lib/payments/components/ConnectOnboarding.tsx",
      },
      {
        src: "templates/expo/screens/ConnectOnboardingScreen.tsx",
        dest: "expo/screens/ConnectOnboardingScreen.tsx",
      },
      {
        src: "templates/expo/components/ConnectOnboarding.tsx",
        dest: "expo/lib/payments/components/ConnectOnboarding.tsx",
      },
      {
        src: "templates/expo/screens/ConnectCheckoutScreen.tsx",
        dest: "expo/screens/ConnectCheckoutScreen.tsx",
      },
      {
        src: "templates/expo/components/ConnectCheckout.tsx",
        dest: "expo/lib/payments/components/ConnectCheckout.tsx",
      },
    ],
  },
};

export const paymentsAccountConfig = {
  standard: {
    dependencies: [],
    templates: [],
  },
  express: {
    dependencies: [],
    templates: [],
  },
};

export const paymentsTypeConfig = {
  single: {
    dependencies: [],
    templates: [],
  },
  subscription: {
    dependencies: [],
    templates: [
      {
        src: "templates/pages/api/payments/subscription/create-subscription.ts",
        dest: "pages/api/payments/subscription/create-subscription.ts",
      },
      {
        src: "templates/pages/api/payments/create-payment-intent.ts",
        dest: "pages/api/payments/create-payment-intent.ts",
      },
      {
        src: "templates/pages/payments/subscription.tsx",
        dest: "pages/payments/subscription.tsx",
      },
      {
        src: "templates/lib/payments/components/Subscription.tsx",
        dest: "lib/payments/components/Subscription.tsx",
      },
      {
        src: "templates/expo/screens/SubscriptionScreen.tsx",
        dest: "expo/screens/SubscriptionScreen.tsx",
      },
      {
        src: "templates/expo/components/Subscription.tsx",
        dest: "expo/lib/payments/components/Subscription.tsx",
      },
    ],
  },
};

export const paymentsCatalogConfig = {
  checkout: {
    dependencies: [],
    templates: [
      {
        src: "templates/pages/api/payments/checkout.ts",
        dest: "pages/api/payments/checkout.ts",
      },
      {
        src: "templates/pages/payments/checkout.tsx",
        dest: "pages/payments/checkout.tsx",
      },
      {
        src: "templates/lib/payments/components/Checkout.tsx",
        dest: "lib/payments/components/Checkout.tsx",
      },
      {
        src: "templates/expo/screens/CheckoutScreen.tsx",
        dest: "expo/screens/CheckoutScreen.tsx",
      },
      {
        src: "templates/expo/components/Checkout.tsx",
        dest: "expo/lib/payments/components/Checkout.tsx",
      },
    ],
  },
  custom: {
    dependencies: [{ name: "@stripe/react-stripe-js" }],
    templates: [
      {
        src: "templates/pages/api/payments/create-payment-intent.ts",
        dest: "pages/api/payments/create-payment-intent.ts",
      },
      {
        src: "templates/pages/payments/custom-checkout.tsx",
        dest: "pages/payments/custom-checkout.tsx",
      },
      {
        src: "templates/lib/payments/components/CustomCheckout.tsx",
        dest: "lib/payments/components/CustomCheckout.tsx",
      },
      {
        src: "templates/lib/payments/components/CheckoutForm.tsx",
        dest: "lib/payments/components/CheckoutForm.tsx",
      },
      {
        src: "templates/expo/screens/CustomCheckoutScreen.tsx",
        dest: "expo/screens/CustomCheckoutScreen.tsx",
      },
      {
        src: "templates/expo/components/CustomCheckout.tsx",
        dest: "expo/lib/payments/components/CustomCheckout.tsx",
      },
    ],
  },
};

export const allDependencies = [
  ...baseConfig.dependencies.map((d) => d.name),
  ...Object.values(paymentsStackConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
  ...Object.values(paymentsConnectConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
  ...Object.values(paymentsAccountConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
  ...Object.values(paymentsTypeConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
  ...Object.values(paymentsCatalogConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
];

export const allTemplates = [
  ...baseConfig.templates.map((t) => t.dest),
  ...Object.values(paymentsStackConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
  ...Object.values(paymentsConnectConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
  ...Object.values(paymentsAccountConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
  ...Object.values(paymentsTypeConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
  ...Object.values(paymentsCatalogConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
];
