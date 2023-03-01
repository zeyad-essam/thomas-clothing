import mongoose from "mongoose";

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
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
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
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

user.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.findIndex((cp) => {
    return cp.productId.toString() == product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = updatedCartItems;

  this.cart = updatedCart;

  return this.save();
};

user.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart = updatedCartItems;
  return this.save();
};

user.methods.clearCart = function () {
  this.cart = [];
  return this.save();
};

export default mongoose.model("User", user);
