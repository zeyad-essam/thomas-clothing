import { createClient } from "redis";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

let redisClient;

export const scanAndDelete = async (pattern) => {
  let cursor = "0";

  try {
    const reply = await redisClient.scan(cursor, {
      MATCH: pattern,
      COUNT: 1000,
    });

    for (let key of reply.keys) {
      cursor = reply.cursor;
      await redisClient.del(key);
    }
  } catch (error) {
    console.log();
  }
};

export const watchProducts = () => {
  const productsCollection = mongoose.connection.collection("products");
  const changeStream = productsCollection.watch([], {
    fullDocument: "updateLookup",
  });

  changeStream.on("change", (changedDocument) => {
    if (
      changedDocument.operationType === "insert" ||
      changedDocument.operationType === "update" ||
      changedDocument.operationType === "replace"
    ) {
      const documentCategory = changedDocument.fullDocument.category;

      if (!documentCategory) {
        return;
      }

      const pattern = "/products/*" + documentCategory + "*"; // a pattern to select all the keys that starts with /products and contains the product category in them

      scanAndDelete(pattern); // delete all cashed keys with the given pattern
    }
  });
};

(async () => {
  redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  redisClient.connect();

  redisClient.on("connect", async function () {
    console.log("Redis client connected");
  });

  redisClient.on("error", function (err) {
    console.log("Something went wrong " + err);
  });
})();

export default redisClient;
