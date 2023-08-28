import express from "express";
import User from "../models/user";
// import MyPost from "../models/post";
import checkAuth from "../middleware/checkAuth";
import stripe from "../utils/stripe";

const router = express.Router();

router.get("/prices", checkAuth, async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  return res.json(prices);
});

router.post("/session", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: (req as any).user.email });

  // MyPost.create({
  //   title: "Exploring the Language of Dance",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1537365587684-f490102e1225?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGFuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  //   content:
  //     "Dive into the realm where bodies become instruments of expression. From classical elegance to contemporary innovation, dance transcends words, telling stories through graceful movement and vibrant energy.",
  //   access: "Free",
  // });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5000/subscription",
      cancel_url: "http://localhost:5000/sub-plan",
      customer: user?.customerStripeId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
  return res.json(session);
});

export default router;
