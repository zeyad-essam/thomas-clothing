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
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

user.methods.addToCart = function (productId, size) {
  const cartProductIndex = this.cart.findIndex((cp) => {
    return cp.product.toString() == productId.toString() && cp.size == size;
  });

  let quantity = 1;
  const updatedCartItems = [...this.cart];

  if (cartProductIndex >= 0) {
    quantity = this.cart[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = quantity;
  } else {
    updatedCartItems.push({
      product: productId,
      size,
      quantity,
    });
  }

  const updatedCart = updatedCartItems;

  this.cart = updatedCart;

  return this.save();
};

user.methods.removeFromCart = async function (productId, size) {
  const updatedCartItems = this.cart.filter((item) => {
    return !(
      item.product.toString() === productId.toString() && item.size === size
    );
  });
  this.cart = updatedCartItems;
  return this.save();
};

user.methods.clearCart = async function () {
  this.cart = [];
  return this.save();
};

export default mongoose.model("User", user);
