import express from "express";
import User from "../models/user";
import MyPost from "../models/post";
import checkAuth from "../middleware/checkAuth";
import stripe from "../utils/stripe";

const router = express.Router();

router.get("/", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: (req as any).user.email });

  const subscriptions = await stripe.subscriptions.list(
    {
      customer: user?.customerStripeId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  if (!subscriptions.data.length) return res.json([]);

  //@ts-ignore
  const plan = subscriptions.data[0].plan.nickname;

  if (plan === "Free") {
    const articles = await MyPost.find({ access: "Free" });
    return res.json(articles);
  } else if (plan === "Silver") {
    const articles = await MyPost.find({
      access: { $in: ["Free", "Silver"] },
    });
    return res.json(articles);
  } else {
    const articles = await MyPost.find({});
    return res.json(articles);
  }

  res.json(plan);
});

export default router;
