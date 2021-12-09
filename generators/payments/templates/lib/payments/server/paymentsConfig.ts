export const paymentsRoutes = {
  checkout: "/api/payments/checkout",
  customCheckout: "/api/payments/create-payment-intent",
};

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

type PaymentsRoutes = typeof paymentsRoutes;

export const clientPaymentsRoutes = Object.keys(paymentsRoutes).reduce((map, key) => {
  map[key as keyof PaymentsRoutes] = paymentsRoutes[key as keyof PaymentsRoutes].replace(
    "/api",
    ""
  );
  return map;
}, {} as PaymentsRoutes);
