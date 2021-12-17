import React, { useState, useEffect } from "react";
import { Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useSubscription } from "@lib/payments/data/paymentsHooks";
import { getStripe } from "@lib/payments/util/stripe";
import { CheckoutForm } from "@lib/payments/ui/CheckoutForm";

export const Subscription = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  const { mutate: subscription } = useSubscription((paymentIntent: any) => {
    if (paymentIntent) {
      setClientSecret(paymentIntent?.clientSecret);
    }
  });

  useEffect(() => {
    const loadStripe = async () => {
      const stripe = await getStripe();
      setStripePromise(stripe);
    };
    loadStripe();
  }, []);

  const onClick = async () => {
    subscription({
      email: "test@example.com",
      price: "price_1Jxd31Ht7fGQ7D9xWVpvb999",
    });
  };

  const appearance: { ["theme"]: "stripe" } = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <button onClick={onClick}>Create Subscription</button>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
