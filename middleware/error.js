const ErrorResponse = require("../utils/errorResponse");

const handleBadObjectId = (err, error) => {
  let newError = error;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    newError = new ErrorResponse(message, 404);
  }
  return newError;
};
const handleDuplicateKey = (err, error) => {
  let newError = error;
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    newError = new ErrorResponse(message, 400);
  }
  return newError;
};
const handleValidationError = (err, error) => {
  let newError = error;

  let data = null;
  if (err.name === "ValidationError") {
    data = Object.values(err.errors).map((val) => ({
      path: val.path,
      message: val.message,
    }));
    const message = Object.values(err.errors).map((val) => val.message);
    newError = new ErrorResponse(message, 400);
  }
  return { error: newError, data };
};
const handleSpecificError = (err) => {
  let error = { ...err };
  let data = null;
  error.message = err.message;

  error = handleBadObjectId(err, error);
  error = handleDuplicateKey(err, error);
  const response = handleValidationError(err, error);
  error = response.error;
  data = response.data;
  return { error, data };
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Log to console for developer
  // eslint-disable-next-line no-console
  console.log(err.stack.red);
  const { error, data } = handleSpecificError(err);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
    data,
  });
};

module.exports = errorHandler;
