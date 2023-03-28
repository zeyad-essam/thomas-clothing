import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { Strategy as TwitterStrategy } from "passport-twitter";

import { Strategy as GitHubStrategy } from "passport-github";

import { Strategy as localStrategy } from "passport-local";

import bcrypt from "bcryptjs";
import User from "./models/User.js";

import crypto from "crypto";
import { promisify } from "util";

const randomBytesAsync = promisify(crypto.randomBytes);

function getKey(size) {
  return randomBytesAsync(size);
}

const passportConfig = (passport) => {
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      // Whatever we return binds to the req.user property

      return done(null, user);
    });
  });

  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          err.message = "something went wrong";
          err.statusCode = 500;
          return done(err);
        }
        if (!user) {
          const error = new Error("No user Existed!");
          error.statusCode = 404;
          return done(error);
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return done(err);
          }
          if (result === true) {
            return done(null, user);
          } else {
            const error = new Error("Password is not correct.");
            error.statusCode = 401;
            done(error);
          }
        });
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      function (_, __, profile, cb) {
        User.findOne({ googleId: profile.id }, async (err, doc) => {
          if (err) {
            return cb(err, null);
          }

          if (!doc) {
            // creating random bytes to generate a password for the user as a place holder
            // when he sign in with google to prevent errors if the users tries to login with his email
            // as it will throw error when bcrypt tries to compare the password he enters with the one in the data base
            const buffer = await getKey(12);
            const generatedPassword = buffer.toString("hex");
            const hasedPassword = await bcrypt.hash(generatedPassword, 12);

            const newUser = new User({
              googleId: profile.id,
              provider: "google",
              username: profile.displayName,
              email: profile.emails[0].value,
              password: hasedPassword,
            });

            await newUser.save();
            cb(null, newUser);
          } else {
            cb(null, doc);
          }
        });
      }
    )
  );

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/api/auth/twitter/callback",
      },
      function (_, __, profile, cb) {
        User.findOne({ twitterId: profile.id }, async (err, doc) => {
          if (err) {
            return cb(err, null);
          }

          if (!doc) {
            const newUser = new User({
              provider: "twitter",
              twitterId: profile.id,
              username: profile.displayName,
            });

            await newUser.save();
            cb(null, newUser);
          } else {
            cb(null, doc);
          }
        });
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/api/auth/github/callback",
      },
      function (_, __, profile, cb) {
        User.findOne({ githubId: profile.id }, async (err, doc) => {
          if (err) {
            return cb(err, null);
          }

          if (!doc) {
            const newUser = new User({
              provider: "github",
              githubId: profile.id,
              username: profile.displayName,
            });

            await newUser.save();
            cb(null, newUser);
          } else {
            cb(null, doc);
          }
        });
      }
    )
  );
};

export default passportConfig;
