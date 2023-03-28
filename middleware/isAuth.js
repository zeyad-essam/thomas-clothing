export default (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    const error = new Error("Not authenticated!");
    error.statusCode = 401;
    next(error);
  }
};
