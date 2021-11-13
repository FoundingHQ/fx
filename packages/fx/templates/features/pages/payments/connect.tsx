import { SEO } from "@components";
import { Connect } from "@lib/payments/components/Connect";

export const ConnectPage = () => {
  return (
    <>
      <SEO title="Connect" />
      <h1>Connect</h1>
      <Connect />
    </>
  );
};

export default ConnectPage;
