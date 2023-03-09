import { Router } from "express";

import * as productsController from "../controllers/products.js";

import { cacheMiddleware } from "../middleware/casheMiddleware.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();

router.post("/add-product", productsController.postAddProduct);

router.get("/get-products", cacheMiddleware, productsController.getProducts);

router.get(
  "/product-details",
  cacheMiddleware,
  productsController.getProductDetails
);

export default router;
