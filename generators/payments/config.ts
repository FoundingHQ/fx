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
      src: "payments/templates/lib/payments/server/paymentsConfig.ts",
      dest: "lib/payments/server/paymentsConfig.ts",
    },
    {
      src: "payments/templates/lib/payments/server/paymentsService.ts",
      dest: "lib/payments/server/paymentsService.ts",
    },
    {
      src: "payments/templates/pages/api/payments/webhook.ts",
      dest: "pages/api/payments/webhook.ts",
    },
    {
      src: "payments/templates/lib/payments/data",
      dest: "lib/payments/data",
    },
    {
      src: "payments/templates/lib/payments/util",
      dest: "lib/payments/util",
    },
    {
      src: "payments/templates/pages/payments/success.tsx",
      dest: "pages/payments/success.tsx",
    },
  ],
};

export const paymentsScopeConfig: Record<string, GeneratorConfigDefinition> = {
  checkout: {
    dependencies: [],
    templates: [
      {
        src: "payments/templates/pages/api/payments/checkout.ts",
        dest: "pages/api/payments/checkout.ts",
      },
      {
        src: "payments/templates/pages/payments/checkout.tsx",
        dest: "pages/payments/checkout.tsx",
      },
      {
        src: "payments/templates/lib/payments/components/Checkout.tsx",
        dest: "lib/payments/components/Checkout.tsx",
      },
      {
        src: "payments/templates/expo/screens/CheckoutScreen.tsx",
        dest: "expo/screens/CheckoutScreen.tsx",
      },
      {
        src: "payments/templates/expo/components/Checkout.tsx",
        dest: "expo/lib/payments/components/Checkout.tsx",
      },
    ],
  },
  "custom-checkout": {
    dependencies: [],
    templates: [
      {
        src: "payments/templates/pages/api/payments/create-payment-intent.ts",
        dest: "pages/api/payments/create-payment-intent.ts",
      },
      {
        src: "payments/templates/pages/payments/custom-checkout.tsx",
        dest: "pages/payments/custom-checkout.tsx",
      },
      {
        src: "payments/templates/lib/payments/components/CustomCheckout.tsx",
        dest: "lib/payments/components/CustomCheckout.tsx",
      },
      {
        src: "payments/templates/lib/payments/components/CheckoutForm.tsx",
        dest: "lib/payments/components/CheckoutForm.tsx",
      },
      {
        src: "payments/templates/expo/screens/CustomCheckoutScreen.tsx",
        dest: "expo/screens/CustomCheckoutScreen.tsx",
      },
      {
        src: "payments/templates/expo/components/CustomCheckout.tsx",
        dest: "expo/lib/payments/components/CustomCheckout.tsx",
      },
    ],
  },
  subscription: {
    dependencies: [],
    templates: [
      {
        src: "payments/templates/pages/api/payments/subscription/create-subscription.ts",
        dest: "pages/api/payments/subscription/create-subscription.ts",
      },
      {
        src: "payments/templates/pages/api/payments/create-payment-intent.ts",
        dest: "pages/api/payments/create-payment-intent.ts",
      },
      {
        src: "payments/templates/pages/payments/subscription.tsx",
        dest: "pages/payments/subscription.tsx",
      },
      {
        src: "payments/templates/lib/payments/components/Subscription.tsx",
        dest: "lib/payments/components/Subscription.tsx",
      },
      {
        src: "payments/templates/expo/screens/SubscriptionScreen.tsx",
        dest: "expo/screens/SubscriptionScreen.tsx",
      },
      {
        src: "payments/templates/expo/components/Subscription.tsx",
        dest: "expo/lib/payments/components/Subscription.tsx",
      },
    ],
  },
  connect: {
    dependencies: [],
    templates: [
      {
        src: "payments/templates/pages/api/payments/connect/onboarding.ts",
        dest: "pages/api/payments/connect/onboarding.ts",
      },
      {
        src: "payments/templates/pages/api/payments/connect/onboarding-refresh.ts",
        dest: "pages/api/payments/connect/onboarding-refresh.ts",
      },
      {
        src: "payments/templates/pages/api/payments/connect/onboarding-refresh.ts",
        dest: "pages/api/payments/connect/onboarding.ts",
      },
      {
        src: "payments/templates/pages/api/payments/create-payment-intent.ts",
        dest: "pages/api/payments/create-payment-intent.ts",
      },
      {
        src: "payments/templates/pages/payments/connect.tsx",
        dest: "pages/payments/connect.tsx",
      },
      {
        src: "payments/templates/lib/payments/components/ConnectCheckout.tsx",
        dest: "lib/payments/components/ConnectCheckout.tsx",
      },
      {
        src: "payments/templates/lib/payments/components/ConnectOnboarding.tsx",
        dest: "lib/payments/components/ConnectOnboarding.tsx",
      },
      {
        src: "payments/templates/expo/screens/ConnectOnboardingScreen.tsx",
        dest: "expo/screens/ConnectOnboardingScreen.tsx",
      },
      {
        src: "payments/templates/expo/components/ConnectOnboarding.tsx",
        dest: "expo/lib/payments/components/ConnectOnboarding.tsx",
      },
      {
        src: "payments/templates/expo/screens/ConnectCheckoutScreen.tsx",
        dest: "expo/screens/ConnectCheckoutScreen.tsx",
      },
      {
        src: "payments/templates/expo/components/ConnectCheckout.tsx",
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
