import { useCheckout } from "@lib/payments/data/paymentsHooks";
import { getStripe } from "@lib/payments/util/stripe";

export const Checkout = () => {
  const { mutate: checkout } = useCheckout(async (checkoutSession: any) => {
    const stripe = await getStripe();

    if (checkoutSession) {
      stripe?.redirectToCheckout({
        sessionId: checkoutSession?.sessionId,
      });
    }
  });

  const onClick = async () => {
    checkout({
      email: "test@example.com",
      price: "price_1JvfzAHt7fGQ7D9x7oD5do0x",
      quantity: 1,
    });
  };

  return <button onClick={onClick}>Checkout</button>;
};
