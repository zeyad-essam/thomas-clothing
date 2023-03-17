import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/User.js";
import Order from "../models/Order.js";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export const stripeWebHook = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event = request.rawBody;

  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.log(err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      const user = await User.findOne({ _id: paymentIntent.metadata.userId });
      await user.clearCart();
      const orderProducts = JSON.parse(paymentIntent.metadata.orderProducts);
      const order = new Order({
        user: user._id,
        products: orderProducts,
        paymentMethod: paymentIntent.payment_method,
        paymentStatus: "PAID",
      });
      await order.save();
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  response.send();
};

export const getCreatePayment = async (req, res) => {
  try {
    const user = await req.user.populate("cart.product");

    if (user.cart <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "User cart is empty" });
    }

    const amount = user.cart.reduce((acc, cur) => {
      return acc + cur.product.price * cur.quantity;
    }, 0);

    const orderProducts = user.cart.map((item) => {
      return {
        product: item.product._id,
        size: item.size,
        quantity: item.quantity,
      };
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: user._id.toString(),
        orderProducts: JSON.stringify(orderProducts),
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntent,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "something went wrong" });
  }
};
