import { useCheckout } from "@lib/payments/data/paymentsHooks";

export const Checkout = () => {
  const { mutate: checkout } = useCheckout();

  return (
    <button onClick={() => checkout({email: ""})}>Checkout</button>
  )
};
