import Product from "../models/Product.js";

export const postAddToCart = async (req, res, next) => {
  const { productId, size } = req.body;
  try {
    const product = await Product.findOne({
      _id: productId,
      availableSizes: { $in: size },
    }).select({ _id: 1, price: 1 });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No product found." });
    }

    const user = await req.user.addToCart(product._id, size, product.price);

    await req.user.populate({
      path: "cart.products.product",
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
  const { productId } = req.body;
  try {
    const user = await req.user.removeFromCart(productId);

    await req.user.populate({
      path: "cart.products.product",
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
