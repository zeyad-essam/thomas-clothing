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

export const getCheckAvailability = async (req, res, next) => {
  const { productId, size } = req.query;
  try {
    const product = await Product.findOne({
      _id: productId,
      availableSizes: { $in: size },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No product found" });
    }

    res.json({ success: true, message: "product is available" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
