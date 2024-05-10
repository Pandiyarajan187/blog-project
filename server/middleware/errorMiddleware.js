const errorMiddleware = (err, req, res, next) => {
  console.error("=----------------", err.stack);
  let message =
    process.env.NODE_ENV == "DEVELOPMENT"
      ? err.stack
      : err.message || "Something Went Wrong";
  let status = err.status || 500;

  res.status(status).json({ error: "Internal Server Error", message });
};

module.exports = errorMiddleware;
