import createHandler from "@api/handler";
import { stripe, getCustomerId } from "@lib/payments/api/paymentsService";

const handler = createHandler();

handler.post(async (req, res) => {
  const { email, items } = req.body;

  const customerId = await getCustomerId(email);

  const calculateOrderAmount = (_items: any) => {
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
