import mongoose from "mongoose";

import Product from "../models/Product.js";

const user = new mongoose.Schema({
  googleId: {
    required: false,
    type: String,
  },
  twitterId: {
    required: false,
    type: String,
  },
  githubId: {
    required: false,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  email: {
    required: false,
    type: String,
  },
  password: {
    required: false,
    type: String,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    totalPrice: { type: Number, required: true, default: 0 },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        size: { type: String, required: true },
      },
    ],
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

user.methods.addToCart = function (productId, size, productPrice) {
  this.cart.totalPrice = this.cart.totalPrice + productPrice;
  this.cart.products.push({ product: productId, size });

  return this.save();
};

user.methods.removeFromCart = async function (productId) {
  const productDoc = this.cart.products.find(
    (doc) => doc._id.toString() == productId.toString()
  );

  const product = await Product.findOne({ _id: productDoc.product }).select({
    _id: 0,
    price: 1,
  });

  this.cart.totalPrice = this.cart.totalPrice - product.price;

  this.cart.products = this.cart.products.filter(
    (product) => product._id.toString() != productId.toString()
  );

  return this.save();
};

user.methods.clearCart = function () {
  this.cart = {
    totalPrice: 0,
    products: [],
  };
  return this.save();
};

export default mongoose.model("User", user);
