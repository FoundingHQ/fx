import { useConnectCheckout } from "../data/paymentsHooks";

export const ConnectCheckout = () => {
  const { mutate: connectCheckout } = useConnectCheckout();

  return (
    <button onClick={() => connectCheckout("")}>Connect Checkout</button>
  )
};
