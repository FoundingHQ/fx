import { useConnectOnboarding } from "@lib/payments/data/paymentsHooks";

export const ConnectOnboarding = () => {
  const { mutate: connectOnboarding } = useConnectOnboarding();

  return (
    <button onClick={() => connectOnboarding({email: ""})}>Connect Onboarding</button>
  )
};
