import Product from "../models/Product.js";
import ApiFeatures from "../utils/apiFeatures.js";

const sizesOrder = [
  "xxs",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "2xl",
  "xxl",
  "3xl",
  "xxxl",
];

const sizesFilteringFunction = (a, b) => {
  a = a.toLowerCase();
  b = b.toLowerCase();

  let nra = parseInt(a);
  let nrb = parseInt(b);

  if (sizesOrder.indexOf(a) != -1) nra = NaN;
  if (sizesOrder.indexOf(b) != -1) nrb = NaN;

  if (nrb === 0) return 1;
  if ((nra && !nrb) || nra === 0) return -1;
  if (!nra && nrb) return 1;
  if (nra && nrb) {
    if (nra == nrb) {
      return a
        .substr(("" + nra).length)
        .localeCompare(a.substr(("" + nra).length));
    } else {
      return nra - nrb;
    }
  } else {
    return sizesOrder.indexOf(a) - sizesOrder.indexOf(b);
  }
};

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
    await Product.find(findObject)
      .sort({ price: -1 })
      .limit(1)
      .select({ price: 1, _id: 0 })
  )[0].price;

  return maxPrice;
};

export const getProductsColorsArray = async (findObject) => {
  const productsColorObjects = await Product.find(findObject).select({
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

export const getProductsAvailabeSizes = async (findObject) => {
  const productsAvailabeSizes = await Product.find(findObject).select({
    availableSizes: 1,
    _id: 0,
  });

  const allProductsAvailableSizesArray = [];

  productsAvailabeSizes.forEach((obj) => {
    allProductsAvailableSizesArray.push(...obj.availableSizes);
  });

  const productsAvailableSizesSet = new Set([
    ...allProductsAvailableSizesArray,
  ]);

  const uniqueSizesArray = [...productsAvailableSizesSet].sort(
    sizesFilteringFunction
  );

  return uniqueSizesArray;
};
