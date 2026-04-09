module.exports = function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || "Server error",
  });
};