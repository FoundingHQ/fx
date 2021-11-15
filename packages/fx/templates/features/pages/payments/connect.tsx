import { SEO } from "@components";
import { ConnectOnboarding } from "@lib/payments/components/ConnectOnboarding";
import { ConnectCheckout } from "@lib/payments/components/ConnectCheckout";

export const ConnectPage = () => {
  return (
    <>
      <SEO title="Connect" />
      <h1>Connect</h1>
      <ConnectOnboarding />
      <ConnectCheckout />
    </>
  );
};

export default ConnectPage;
