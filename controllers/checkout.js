import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/User.js";
import Order from "../models/Order.js";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const getProductsAmount = (cart) => {
  return cart.reduce((acc, cur) => {
    return acc + cur.product.price * cur.quantity;
  }, 0);
};

const getOrderProducts = (cart) => {
  return cart.map((item) => {
    return {
      product: item.product._id,
      size: item.size,
      quantity: item.quantity,
    };
  });
};

export const getCreatePayment = async (req, res) => {
  try {
    const { shippingInfo } = req.query;
    const user = await req.user.populate("cart.product");

    if (user.cart.length <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "User cart is empty" });
    }

    const amount = getProductsAmount(user.cart);

    const orderProducts = getOrderProducts(user.cart);

    const orderDetails = {
      user: user._id.toString(),
      products: orderProducts,
      totalAmount: amount,
      shippingInfo: shippingInfo,
    };

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderDetails: JSON.stringify(orderDetails),
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntent,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "something went wrong" });
  }
};

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
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      try {
        const paymentIntent = event.data.object;
        const orderDetails = JSON.parse(paymentIntent.metadata.orderDetails);
        const user = await User.findById(orderDetails.user);

        const order = new Order({
          ...orderDetails,
          paymentMethod: paymentIntent.payment_method,
          status: "Being prepared.",
        });

        await order.save();
        user.cart = [];
        user.orders.push(order._id);
        await user.save();
      } catch (err) {
        response.status(500).send("something went wrong!");
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  response.send();
};

export const postCashCheckout = async (req, res, next) => {
  try {
    const { shippingInfo } = req.body;
    console.log(shippingInfo);
    const user = await req.user.populate("cart.product");

    if (user.cart.length <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "User cart is empty" });
    }

    const amount = getProductsAmount(user.cart);
    const orderProducts = getOrderProducts(user.cart);

    const order = new Order({
      user: user._id,
      shippingInfo: shippingInfo,
      products: orderProducts,
      totalAmount: amount,
      paymentMethod: "Cash on delivery",
      status: "Being prepared.",
    });

    await order.save();
    user.cart = [];
    user.orders.push(order._id);
    await user.save();
    res.status(201).json({
      success: true,
      message: "order created",
      order: {
        products: orderProducts,
        totalAmount: amount,
        status: "Being prepared.",
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
