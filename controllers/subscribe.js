import { validationResult } from "express-validator";

import Subscriber from "../models/Subscriber.js";

export const postNewsSubscribe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(403)
      .json({ success: false, message: errors.array()[0].msg });
  }
  const email = req.body.email;
  try {
    const subscriber = new Subscriber({
      email: email,
    });
    const result = await subscriber.save();
    res
      .status(201)
      .json({ success: true, message: "Successfully subscribed." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
