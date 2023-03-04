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
      responseData.maxPrice = maxPrice;

      const productsColorArray = await getProductsColorsArray(
        findObject,
        query
      );
      responseData.productsColorArray = productsColorArray;

      const productsAvailableSizes = await getProductsAvailabeSizes(
        findObject,
        query
      );
      responseData.productsAvailableSizes = productsAvailableSizes;
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
