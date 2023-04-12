import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import connectMongoDbSession from "connect-mongodb-session";
import compression from "compression";
import passport from "passport";
import passportConfig from "./passport.js";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { watchProducts } from "./utils/redis.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import subscribeRoutes from "./routes/subscribe.js";
import checkoutRoutes from "./routes/checkout.js";
import markdownRoutes from "./routes/markdown.js";
import messagesRoutes from "./routes/messages.js";

import path from "path";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

const MongoDBStore = connectMongoDbSession(session);

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  express.json({
    verify: function (req, res, buf) {
      var url = req.originalUrl;
      if (url.includes("webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

const cspConfig = {
  directives: {
    defaultSrc: ["'self'", "https://js.stripe.com/"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
    imgSrc: [
      "'self'",
      "https://res.cloudinary.com",
      "https://purecatamphetamine.github.io",
      "data:",
    ],
  },
};

app.use(
  helmet({
    contentSecurityPolicy: cspConfig,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(compression());

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://thomas-clothing.herokuapp.com/"],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "Access-Control-Allow-Credentials",
      "Cross-Origin-Resource-Policy",
      "stripe-signature",
    ],
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

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/message", messagesRoutes);
app.use("/api", markdownRoutes);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const data = error.data;
  res.status(status).json({ message: "Something went wrong!", data: data });
});

const host = "0.0.0.0";
const port = process.env.PORT || 8000;

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    watchProducts();
    app.listen(port, host);
  })
  .catch((err) => console.log(err));
