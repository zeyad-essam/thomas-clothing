import Product from "../models/Product.js";

import { cacheResponse } from "../middleware/casheMiddleware.js";

import {
  getFilteredProducts,
  getProductsColorsArray,
  getProductsCount,
  getProductsMaxPrice,
  getProductsAvailabeSizes,
} from "../utils/productsFunctions.js";

export const postAddProduct = async (req, res, next) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
};

export const getProducts = async (req, res, next) => {
  const query = req.query;
  const category = query.category;
  let findObject = category ? { category } : {};
  const requestedPage = Number(query.page);

  let responseData = {
    success: true,
  };

  try {
    const products = await getFilteredProducts(findObject, query);

    responseData.products = products;

    // only get these information if it is the first page being requested
    if (requestedPage === 1) {
      const productsCount = await getProductsCount(findObject, query);
      responseData.productsCount = productsCount;

      const maxPrice = await getProductsMaxPrice(findObject, query);

      const colors = await getProductsColorsArray(findObject, query);

      const sizes = await getProductsAvailabeSizes(findObject, query);

      responseData.filterData = { maxPrice, colors, sizes };
    }

    const casheValue = JSON.stringify(responseData);
    const casheKey = req.originalUrl || req.url;
    const cacheExpirationTime = 7200;

    cacheResponse(casheKey, casheValue, cacheExpirationTime);

    res.json(responseData);
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getProductDetails = async (req, res, next) => {
  const { slug } = req.query;
  try {
    const product = await Product.findOne({ slug });

    const responseData = {
      success: true,
      product: product,
    };

    const casheValue = JSON.stringify(responseData);
    const casheKey = req.originalUrl || req.url;
    const cacheExpirationTime = 7200;

    cacheResponse(casheKey, casheValue, cacheExpirationTime);
    res.json(responseData);
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
    }).select({ _id: 1, title: 1, slug: 1, price: 1, color: 1 });

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

    console.log(user.cart.products);

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
