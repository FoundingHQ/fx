import { SEO } from "@components";
import { Checkout } from "@lib/payments/components/Checkout";

export const CheckoutPage = () => {
  return (
    <>
      <SEO title="Checkout" />
      <h1>Checkout</h1>
      <Checkout />
    </>
  );
};

export default CheckoutPage;
