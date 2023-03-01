import { Router } from "express";
import passport from "passport";
import { body } from "express-validator";
import User from "../models/User.js";

import * as authController from "../controllers/auth.js";

const router = Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("email address already exists");
          }
        });
      }),
    body("password").trim().isLength({ min: 8, max: 24 }),
    body("username").trim().isLength({ min: 6 }).not().isEmpty(),
  ],
  authController.putSignup
);

router.post("/login", authController.postLogin);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
    session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "http://localhost:3000",
    session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000",
    session: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

router.get("/getuser", authController.getUser);

router.post("/reset", authController.postReset);

router.post(
  "/new-password",
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
  body("passwordConfirm")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("passwords have to match");
      }
      return true;
    }),
  authController.postNewPasword
);

router.get("/logout", authController.getLogout);

export default router;
