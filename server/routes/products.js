import { Router } from "express";

import * as productsController from "../controllers/products.js";

const router = Router();

router.post("/add-product", productsController.postAddProduct);

router.get("/get-products", productsController.getProducts);

router.get("/get-more-products", productsController.getMoreProducts);

export default router;
