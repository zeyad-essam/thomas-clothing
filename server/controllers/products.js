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
  const category = req.query.category;
  let findObject = category ? { category } : {};
  try {
    const products = await getFilteredProducts(findObject, req.query);

    const productsCount = await getProductsCount(findObject, req.query);

    const maxPrice = await getProductsMaxPrice(findObject, req.query);

    const productsColorArray = await getProductsColorsArray(
      findObject,
      req.query
    );

    const productsAvailableSizes = await getProductsAvailabeSizes(
      findObject,
      req.query
    );

    const responseData = {
      success: true,
      products,
      productsCount,
      maxPrice,
      colors: productsColorArray,
      sizes: productsAvailableSizes,
    };

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

export const getMoreProducts = async (req, res, next) => {
  const category = req.query.category;
  let findObject = category ? { category } : {};
  try {
    const products = await getFilteredProducts(findObject, req.query);

    const responseData = { success: true, products };

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
