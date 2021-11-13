import { useConnectOnboarding } from "../data/paymentsHooks";

export const ConnectOnboarding = () => {
  const { mutate: connectOnboarding } = useConnectOnboarding();

  return (
    <button onClick={() => connectOnboarding("")}>Connect Onboarding</button>
  )
};
