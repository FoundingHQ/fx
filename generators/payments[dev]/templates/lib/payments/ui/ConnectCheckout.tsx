import { useConnectCheckout } from "@lib/payments/data/paymentsHooks";

export const ConnectCheckout = () => {
  const { mutate: connectCheckout } = useConnectCheckout();

  return (
    <button onClick={() => connectCheckout({email: ""})}>Connect Checkout</button>
  )
};
