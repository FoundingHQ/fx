import createHandler from "@server/handler";
import { stripe, getCustomerId } from "@lib/payments/server/paymentsService";

const handler = createHandler();

handler.post(async (req, res) => {
  const { items } = req.body;

  if (!items) {
    throw new Error("Missing parameter items");
  }

  const email = req.user?.email;

  const customerId = await getCustomerId(email);

  const calculateOrderAmount = (_items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    payment_method_types: ["card"],
    customer: customerId,
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
});

export default handler;
