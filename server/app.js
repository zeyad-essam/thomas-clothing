import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import connetMongoDbSession from "connect-mongodb-session";
import cors from "cors";
import passport from "passport";
import passportConfig from "./passport.js";
import dotenv from "dotenv";

import { createClient } from "redis";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import subscribeRoutes from "./routes/subscribe.js";

export const redisClient = createClient({
  password: "NoddlYcNNkMOHvDPgJLRetW0841UhQwA",
  socket: {
    host: "redis-15447.c55.eu-central-1-1.ec2.cloud.redislabs.com",
    port: 15447,
  },
});

redisClient.connect();

redisClient.on("connect", async function () {
  console.log("Redis client connected");
});

redisClient.on("error", function (err) {
  console.log("Something went wrong " + err);
});

dotenv.config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

const MongoDBStore = connetMongoDbSession(session);

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(express.json());
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
app.use(subscribeRoutes);

app.get("/", (req, res, next) => {
  console.log(req.isAuthenticated());
  res.send("<h1>hello world !</h1>");
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  // const message = error.message;
  const data = error.data;
  res.status(status).json({ message: "Something went wrong!", data: data });
});

const port = process.env.port || 8000;

async function scanAndDelete(pattern) {
  let cursor = "0";

  const reply = await redisClient.scan(cursor, { MATCH: pattern, COUNT: 1000 });
  for (let key of reply.keys) {
    cursor = reply.cursor;
    await redisClient.del(key);
  }
}

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    const productsCollection = mongoose.connection.collection("products");
    const changeStream = productsCollection.watch();

    changeStream.on("change", (change) => {
      if (
        change.operationType === "insert" ||
        change.operationType === "update" ||
        change.operationType === "replace"
      ) {
        scanAndDelete("/products*"); // delete all cashed products data on redis
      }
    });

    const server = app.listen(port);
  })
  .catch((err) => console.log(err));
