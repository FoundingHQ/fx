// Map our custom plan IDs ("basic", "premium", etc) to Stripe price IDs
const stripePriceIds = {
  pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
};

export type StripePriceId = keyof typeof stripePriceIds;

// Get Stripe priceId
export const getStripePriceId = (planId: StripePriceId) =>
  stripePriceIds[planId];

// Get friendly plan ID ("basic", "premium", etc) by Stripe plan ID
// Used in auth.js to include planId in the user object
export const getFriendlyPlanId = (stripePriceId: StripePriceId) =>
  Object.keys(stripePriceIds).find(
    (key) => stripePriceIds[key as StripePriceId] === stripePriceId
  );
