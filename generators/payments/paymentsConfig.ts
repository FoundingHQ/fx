import { GeneratorConfigDefinition } from "@founding/devkit";

export const baseConfig: GeneratorConfigDefinition = {
  dependencies: [
    { name: "@stripe/stripe-js" },
    { name: "stripe" },
    { name: "@stripe/react-stripe-js" }, // is this required for all stripe templates?
    { name: "@stripe/stripe-react-native", isExpoDep: true },
  ],
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

export const paymentsScopeConfig: Record<string, GeneratorConfigDefinition> = {
  checkout: {
    dependencies: [],
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
      {
        src: "templates/features/payments/expo/screens/CheckoutScreen.tsx",
        dest: "expo/screens/CheckoutScreen.tsx",
      },
      {
        src: "templates/features/payments/expo/components/Checkout.tsx",
        dest: "expo/lib/payments/components/Checkout.tsx",
      },
    ],
  },
  "custom-checkout": {
    dependencies: [],
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
      {
        src: "templates/features/payments/components/CheckoutForm.tsx",
        dest: "lib/payments/components/CheckoutForm.tsx",
      },
      {
        src: "templates/features/payments/expo/screens/CustomCheckoutScreen.tsx",
        dest: "expo/screens/CustomCheckoutScreen.tsx",
      },
      {
        src: "templates/features/payments/expo/components/CustomCheckout.tsx",
        dest: "expo/lib/payments/components/CustomCheckout.tsx",
      },
    ],
  },
  subscription: {
    dependencies: [],
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
      {
        src: "templates/features/payments/expo/screens/SubscriptionScreen.tsx",
        dest: "expo/screens/SubscriptionScreen.tsx",
      },
      {
        src: "templates/features/payments/expo/components/Subscription.tsx",
        dest: "expo/lib/payments/components/Subscription.tsx",
      },
    ],
  },
  connect: {
    dependencies: [],
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
      {
        src: "templates/features/payments/expo/screens/ConnectOnboardingScreen.tsx",
        dest: "expo/screens/ConnectOnboardingScreen.tsx",
      },
      {
        src: "templates/features/payments/expo/components/ConnectOnboarding.tsx",
        dest: "expo/lib/payments/components/ConnectOnboarding.tsx",
      },
      {
        src: "templates/features/payments/expo/screens/ConnectCheckoutScreen.tsx",
        dest: "expo/screens/ConnectCheckoutScreen.tsx",
      },
      {
        src: "templates/features/payments/expo/components/ConnectCheckout.tsx",
        dest: "expo/lib/payments/components/ConnectCheckout.tsx",
      },
    ],
  },
};

export const allDependencies = [
  ...baseConfig.dependencies.map((d) => d.name),
  ...Object.values(paymentsScopeConfig)
    .map(({ dependencies }) => dependencies.map((d) => d.name))
    .flat(),
];

export const allTemplates = [
  ...baseConfig.templates.map((t) => t.dest),
  ...Object.values(paymentsScopeConfig)
    .map((c) => c.templates.map((t) => t.dest))
    .flat(),
];
