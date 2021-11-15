import createHandler from "@server/handler";
import { stripe } from "@lib/payments/server/paymentsService";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

const handler = createHandler();

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

handler.post(async (req, res) => {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"]!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.log(`❌ Error message: ${err?.message}`);
    return res.status(400).send(`Webhook Error: ${err?.message}`);
  }

  if (relevantEvents.has(event.type)) {
    try {
      console.log(event);
      switch (event.type) {
        default:
          throw new Error(`Unhandled relevant event! ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send('Webhook error: "Webhook handler failed. View logs."');
    }
  }

  res.json({ received: true });
});

export default handler;
