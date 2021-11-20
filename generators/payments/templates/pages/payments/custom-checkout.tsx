import { SEO } from "@components";
import { CustomCheckout } from "@lib/payments/components/CustomCheckout";

export const CustomCheckoutPage = () => {
  return (
    <>
      <SEO title="Custom Checkout" />
      <h1>Custom Checkout</h1>
      <CustomCheckout />
    </>
  );
};

export default CustomCheckoutPage;
