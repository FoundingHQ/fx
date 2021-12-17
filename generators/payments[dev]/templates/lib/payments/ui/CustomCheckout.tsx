import React, { useState, useEffect } from "react";
import { Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useCustomCheckout } from "@lib/payments/data/paymentsHooks";
import { getStripe } from "@lib/payments/util/stripe";
import { CheckoutForm } from "@lib/payments/ui/CheckoutForm";

export const CustomCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  const { mutate: customCheckout } = useCustomCheckout((paymentIntent: any) => {
    if (paymentIntent) {
      setClientSecret(paymentIntent?.clientSecret);
    }
  });

  useEffect(() => {
    const loadStripe = async () => {
      const stripe = await getStripe();
      setStripePromise(stripe);
    }
    loadStripe();
  }, [])

  const onClick = async () => {
    customCheckout({
      email: "test@example.com",
      items: [],
    });
  };

  const appearance: {["theme"]: "stripe"} = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <button onClick={onClick}>
        Create payment intent
      </button>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
