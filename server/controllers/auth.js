import passport from "passport";
import User from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { promisify } from "util";

import { sendPasswordReset } from "../utils/emailFeatures.js";

const randomBytes = promisify(crypto.randomBytes);

export const putSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ success: false, message: errors.array()[0].msg });
  }
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      username: username,
    });
    const savedUser = await user.save();

    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(201).json({
        success: true,
        message: "User created!",
        user: {
          _id: savedUser._id,
          username: savedUser.username,
          cart: savedUser.cart,
        },
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(401).json({ success: false, message: err.message });
    }
    if (!user) res.status(404).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          success: true,
          message: "Successfully Authenticated",
          user: { username: user.username, _id: user._id, cart: user.cart },
        });
      });
    }
  })(req, res, next);
};

export const postReset = async (req, res, next) => {
  try {
    const buffer = await randomBytes(32);
    const token = buffer.toString("hex");
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with the given email",
      });
    }
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();
    res.status(200).json({
      success: true,
      message:
        "We have sent you a link to update your password. Check your email address",
    });
    const resetLink = `http://localhost:3000/auth/new-password/${user._id}/${token}`;

    sendPasswordReset(user.username, user.email, resetLink);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const postNewPasword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(403)
      .json({ success: false, message: errors.array()[0].msg });
  }

  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;

  try {
    const user = await User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credintials!",
      });
    }

    const hasedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hasedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      res
        .status(200)
        .json({ success: true, message: "Password reset successfully," });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getUser = (req, res) => {
  if (req.user) {
    const userData = {
      _id: req.user._id,
      username: req.user.username,
      cart: req.user.cart,
    };
    res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      user: userData,
    });
  } else {
    res.status(404).json({ message: "No logged in user" });
  }
};

export const getLogout = (req, res, next) => {
  if (req.user) {
    req.session.destroy();
    req.logout();
    res.status(200).json({ message: "User logged out successfully." });
  } else {
    res.status(400).json({ message: "No logged in user." });
  }
};
