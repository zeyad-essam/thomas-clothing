import { Router } from "express";

import express from "express";

import * as checkoutController from "../controllers/checkout.js";

const router = Router();

router.get("/create-payment-intent", checkoutController.getCreatePayment);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  checkoutController.stripeWebHook
);

router.post("/cash-checkout", checkoutController.postCashCheckout);

export default router;
