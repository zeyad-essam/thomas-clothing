import { Router } from "express";

import * as productsController from "../controllers/products.js";

import { cacheMiddleware } from "../middleware/casheMiddleware.js";

const router = Router();

router.post("/add-product", productsController.postAddProduct);

router.get("/get-products", cacheMiddleware, productsController.getProducts);

router.get(
  "/product-details",
  cacheMiddleware,
  productsController.getProductDetails
);

router.get("/check-availability", productsController.getCheckAvailability);

export default router;
