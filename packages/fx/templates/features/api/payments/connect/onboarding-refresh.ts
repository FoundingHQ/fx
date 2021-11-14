import createHandler from "@server/handler";
import { generateAccountLink } from "@lib/payments/server/paymentsService";

const handler = createHandler();

handler.post(async (req, res) => {
  const { accountId } = req.body;

  if (!accountId) {
    throw new Error("Missing parameter accountId");
  }

  try {
    const origin = `${req.secure ? "https://" : "https://"}${req.headers.host}`;

    const accountLinkUrl = await generateAccountLink(accountId, origin);
    res.redirect(accountLinkUrl);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

export default handler;
