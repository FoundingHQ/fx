import { useCustomCheckout } from "@lib/payments/data/paymentsHooks";

export const CustomCheckout = () => {
  const { mutate: customCheckout } = useCustomCheckout();

  return (
    <button onClick={() => customCheckout("")}>Custom Checkout</button>
  )
};
