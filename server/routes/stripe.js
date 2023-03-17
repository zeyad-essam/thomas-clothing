import { Router } from "express";

import express from "express";

import * as stripeController from "../controllers/stripe.js";

const router = Router();

router.get("/create-payment-intent", stripeController.getCreatePayment);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeController.stripeWebHook
);

export default router;
