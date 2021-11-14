import createHandler from "@server/handler";
import { stripe, getCustomerId } from "@lib/payments/server/paymentsService";
import { APP_URL } from "@lib/payments/server/paymentsConfig";

const handler = createHandler();

handler.post(async (req, res) => {
  const { email, price, quantity = 1, isSubscription } = req.body;

  if (!price) {
    throw new Error("Missing parameter price");
  }

  const customerId = await getCustomerId(email);

  let checkoutTypeConfig: any = {
    mode: "payment",
  };

  if (isSubscription) {
    checkoutTypeConfig = {
      mode: "subscription",
      subscription_data: {
        trial_from_plan: true,
        metadata: {},
      },
    }
  }
  
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "required",
    customer: customerId,
    client_reference_id: customerId,
    line_items: [
      {
        price: price,
        quantity: quantity,
      },
    ],
    ...checkoutTypeConfig,
    success_url: `${APP_URL}/profile`,
    cancel_url: `${APP_URL}/`,
  });

  return res.status(200).json({ sessionId: checkoutSession.id });
});

export default handler;
