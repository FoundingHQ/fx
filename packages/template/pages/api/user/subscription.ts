import { createHandler } from "@server/handler";
import { prisma } from "@server/prisma";

const handler = createHandler();

handler.get(async (req, res) => {
  const userId = req.user?.id;

  const subscription = await prisma.subscription?.findFirst({
    where: {
      userId: userId,
      status: {
        in: ["active", "trialing"],
      },
    },
  });

  return res.status(200).json({ subscription });
});

export default handler;
