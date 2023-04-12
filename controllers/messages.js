import { validationResult } from "express-validator";

import Message from "../models/Message.js";

export const postContactMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(403)
      .json({ success: false, message: errors.array()[0].msg });
  }
  const { email, userName, object, message } = req.body;
  try {
    const userMessage = new Message({
      email,
      userName,
      object,
      message,
    });
    await userMessage.save();
    res
      .status(201)
      .json({ success: true, message: "Message sent Successfully." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
