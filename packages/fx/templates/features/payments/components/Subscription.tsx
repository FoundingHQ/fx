import { useSubscription } from "@lib/payments/data/paymentsHooks";

export const Subscription = () => {
  const { mutate: subscription } = useSubscription();

  return (
    <button onClick={() => subscription("")}>Create Subscription</button>
  )
};
