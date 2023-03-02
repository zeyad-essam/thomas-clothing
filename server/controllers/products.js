import Product from "../models/Product.js";

import ApiFeatures from "../utils/apiFeatures.js";

export const postAddProduct = async (req, res, next) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
};

export const getProducts = async (req, res, next) => {
  const category = req.query.category;
  let findObject = category ? { category } : {};
  try {
    const products = await new ApiFeatures(Product.find(findObject), req.query)
      .filter()
      .pagination(10)
      .query.select({
        _id: 1,
        title: 1,
        images: 1,
        price: 1,
        slug: 1,
      });

    const productsCount = await new ApiFeatures(
      Product.find(findObject),
      req.query
    )
      .filter()
      .query.countDocuments();

    const maxPrice = (
      await new ApiFeatures(Product.find(findObject), req.query)
        .filter()
        .query.sort({ price: -1 })
        .limit(1)
        .select({ price: 1, _id: 0 })
    )[0].price;

    res.json({ success: true, products, productsCount, maxPrice });
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
    const products = await new ApiFeatures(Product.find(findObject), req.query)
      .filter()
      .pagination(10)
      .query.select({
        _id: 1,
        title: 1,
        images: 1,
        price: 1,
        slug: 1,
      });

    res.json({ success: true, products });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
