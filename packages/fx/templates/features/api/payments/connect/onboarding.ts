import createHandler from "@server/handler";
import { stripe } from "@lib/payments/server/paymentsService";
import { generateAccountLink } from "@lib/payments/server/paymentsService";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const account = await stripe.accounts.create({type: "standard"});
    const origin = `${req.headers.origin}`;
    const accountLinkUrl = await generateAccountLink(account.id, origin);
    res.send({ url: accountLinkUrl, accountId: account.id });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

export default handler;
