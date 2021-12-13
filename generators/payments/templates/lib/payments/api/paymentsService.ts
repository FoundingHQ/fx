import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2020-08-27",
});

export const getCustomerId = async (email: string) => {
  const customer = await stripe.customers.list({
    email: email,
    limit: 1
  });

  if(customer.data.length !== 0){
    return customer.data[0].id;
  }

  const newCustomer = await stripe.customers.create({ email });
  return newCustomer.id;
};
