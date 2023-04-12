import { Router } from "express";

import { body } from "express-validator";

import * as messagesController from "../controllers/messages.js";

const router = Router();

router.post(
  "/post-contact-message",
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  messagesController.postContactMessage
);

export default router;
