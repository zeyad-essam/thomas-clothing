import Product from "../models/Product.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const getFilteredProducts = async (findObject, query) => {
  const products = await new ApiFeatures(Product.find(findObject), query)
    .filter()
    .pagination(10)
    .query.select({
      _id: 1,
      title: 1,
      images: 1,
      price: 1,
      slug: 1,
    });

  return products;
};

export const getProductsCount = async (findObject, query) => {
  const productsCount = await new ApiFeatures(Product.find(findObject), query)
    .filter()
    .query.countDocuments();
  return productsCount;
};

export const getProductsMaxPrice = async (findObject, query) => {
  const maxPrice = (
    await new ApiFeatures(Product.find(findObject), query)
      .filter()
      .query.sort({ price: -1 })
      .limit(1)
      .select({ price: 1, _id: 0 })
  )[0].price;

  return maxPrice;
};

export const getProductsColorsArray = async (findObject, query) => {
  const productsColorObjects = await new ApiFeatures(
    Product.find(findObject),
    query
  )
    .filter()
    .query.select({
      _id: 0,
      color: 1,
    });

  const productsColorSet = new Set();

  productsColorObjects.forEach((obj) => {
    productsColorSet.add(JSON.stringify(obj.color));
  });

  const productsColorsArray = [];

  productsColorSet.forEach((value) => {
    productsColorsArray.push(JSON.parse(value));
  });

  return productsColorsArray;
};

export const getProductsAvailabeSizes = async (findObject, query) => {
  const productsAvailabeSizes = await new ApiFeatures(
    Product.find(findObject),
    query
  )
    .filter()
    .query.select({ availableSizes: 1, _id: 0 });

  const allProductsAvailableSizesArray = [];

  productsAvailabeSizes.forEach((obj) => {
    allProductsAvailableSizesArray.push(...obj.availableSizes);
  });

  const productsAvailableSizesSet = new Set([
    ...allProductsAvailableSizesArray,
  ]);

  const uniqueSizesArray = [...productsAvailableSizesSet].sort();

  return uniqueSizesArray;
};
