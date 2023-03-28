import { Router } from "express";

import * as cartController from "../controllers/cart.js";

import isAuth from "../middleware/isAuth.js";

const router = Router();

router.get("/get-user-cart", isAuth, cartController.getUserCart);

router.put("/set-user-cart", isAuth, cartController.putUserCart);

router.post("/add-to-cart", isAuth, cartController.postAddToCart);

router.delete("/remove-from-cart", isAuth, cartController.removeFromCart);

export default router;
