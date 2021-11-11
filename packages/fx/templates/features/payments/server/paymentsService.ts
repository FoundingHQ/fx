import Stripe from "stripe";
import { prisma } from "@server/prisma";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2020-08-27",
});
