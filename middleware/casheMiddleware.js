import redisClient from "../utils/redis.js";

export const cacheMiddleware = async (req, res, next) => {
  const cacheKey = req.originalUrl || req.url;
  try {
    const data = await redisClient.get(cacheKey);
    if (data !== null) {
      res.json(JSON.parse(data));
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

export function cacheResponse(cacheKey, cacheValue, cacheExpirationTime) {
  redisClient.set(
    cacheKey,
    cacheValue,
    { EX: cacheExpirationTime, NX: true },
    (err, reply) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Cached data for ${cacheKey}`);
      }
    }
  );
}
