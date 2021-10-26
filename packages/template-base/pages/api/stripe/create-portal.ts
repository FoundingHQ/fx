import { createHandler, APP_URL } from "@server/handler";
import { stripe, getCustomerId } from "@lib/payments/server/paymentsService";

const handler = createHandler();

handler.post(async (req, res) => {
  const userId = req.user?.id;

  const customerId = await getCustomerId(userId);

  const { url } = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${APP_URL}/profile`,
  });

  return res.status(200).json({ url });
});

export default handler;
