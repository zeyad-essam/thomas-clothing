import Product from "../models/Product.js";
import User from "../models/User.js";

export const getUserCart = async (req, res, next) => {
  try {
    const user = await req.user.populate({
      path: "cart.product",
      select: {
        _id: 1,
        title: 1,
        slug: 1,
        price: 1,
        images: { $slice: 1 },
        color: 1,
      },
    });

    res.json({
      success: true,
      cart: user.cart,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const putUserCart = async (req, res, next) => {
  const { cart } = req.body;
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.cart = cart;
    await user.save();

    res.json({
      success: true,
      cart: user.cart,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const postAddToCart = async (req, res, next) => {
  const { productId, size } = req.body;
  try {
    const product = await Product.findOne({
      _id: productId,
      availableSizes: { $in: size },
    }).select({ _id: 1 });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No product found." });
    }

    const user = await req.user.addToCart(product._id, size);

    await req.user.populate({
      path: "cart.product",
      select: {
        _id: 1,
        title: 1,
        slug: 1,
        price: 1,
        images: { $slice: 1 },
        color: 1,
      },
    });

    res.json({
      success: true,
      cart: user.cart,
      message: "product added successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  const { productId, size } = req.body;
  try {
    const product = req.user.cart.find(
      (item) =>
        item.product.toString() == productId.toString() && item.size == size
    );

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "No product found." });
    }

    const user = await req.user.removeFromCart(productId, size);

    await req.user.populate({
      path: "cart.product",
      select: {
        _id: 1,
        title: 1,
        slug: 1,
        price: 1,
        images: { $slice: 1 },
        color: 1,
      },
    });

    res.json({
      success: true,
      cart: user.cart,
      message: "product removed Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
