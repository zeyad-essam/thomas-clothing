import { Router } from "express";

import { body } from "express-validator";

import Subscriber from "../models/Subscriber.js";

import * as subscribeController from "../controllers/subscribe.js";

const router = Router();

router.post(
  "/news-subscribe",
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => {
      return Subscriber.findOne({ email: value }).then((subscriberDoc) => {
        if (subscriberDoc) {
          return Promise.reject("email address already subscribed.");
        }
      });
    })
    .normalizeEmail(),
  subscribeController.postNewsSubscribe
);

export default router;
