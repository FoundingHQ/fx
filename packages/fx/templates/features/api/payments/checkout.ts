import createHandler from "@server/handler";
import { stripe, getCustomerId } from "@lib/payments/server/paymentsService";
import { APP_URL } from "@lib/payments/server/paymentsConfig";

const handler = createHandler();

handler.post(async (req, res) => {
  const { email, price, quantity = 1 } = req.body;

  console.log("REQ.body", req.body);
  const customerId = await getCustomerId(email);
  console.log("customerId", customerId);

  let checkoutTypeConfig: any = {
    mode: "payment",
  };

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "required",
    customer: customerId,
    client_reference_id: customerId,
    line_items: [
      {
        price: "price_1JvfzAHt7fGQ7D9x7oD5do0x",
        quantity: quantity,
      },
    ],
    ...checkoutTypeConfig,
    success_url: `${APP_URL}/payments/success`,
    cancel_url: `${APP_URL}/`,
  });

  return res.status(200).json({ sessionId: checkoutSession.id });
});

export default handler;
