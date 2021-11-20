import createHandler from "@server/handler";
import { stripe } from "@lib/payments/server/paymentsService";
import { getCustomerId } from "@lib/payments/server/paymentsService";
import { Stripe } from "stripe";

const handler = createHandler();

handler.post(async (req, res) => {
  const { price, quantity = 1, isSubscription } = req.body;

  if (!price) {
    throw new Error("Missing parameter price");
  }

  const email = req.user?.id;

  const customerId = await getCustomerId(email);

  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: price,
          quantity: quantity,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    const latestInvoice = subscription?.latest_invoice as Stripe.Invoice;
    const paymentIntent = latestInvoice?.payment_intent as Stripe.PaymentIntent;

    res.send({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

export default handler;
