import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import connetMongoDbSession from "connect-mongodb-session";
import cors from "cors";
import passport from "passport";
import passportConfig from "./passport.js";
import dotenv from "dotenv";

import { watchProducts } from "./utils/redis.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import subscribeRoutes from "./routes/subscribe.js";
import stripeRoutes from "./routes/stripe.js";

dotenv.config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

const MongoDBStore = connetMongoDbSession(session);

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  express.json({
    verify: function (req, res, buf) {
      var url = req.originalUrl;
      if (url.startsWith("/stripe/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("puplic"));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://thomas-clothing.netlify.app"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/stripe", stripeRoutes);
app.use(subscribeRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  // const message = error.message;
  const data = error.data;
  res.status(status).json({ message: "Something went wrong!", data: data });
});

const port = process.env.port || 8000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    watchProducts();
    app.listen(port);
  })
  .catch((err) => console.log(err));
