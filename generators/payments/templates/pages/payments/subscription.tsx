import { SEO } from "@components";
import { Subscription } from "@lib/payments/components/Subscription";

export const SubscriptionPage = () => {
  return (
    <>
      <SEO title="Subscription" />
      <h1>Subscription</h1>
      <Subscription />
    </>
  );
};

export default SubscriptionPage;
