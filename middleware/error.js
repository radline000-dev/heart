const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err.name);

  //Mongo bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
  }

  //값이 같은 경우에 대한 에러 Duplicate
  if (err.code === 11000) {
    const message = "Duplicate filed value entered";
    error = new ErrorResponse(message, 400);
  }

  // match 키워드 -> 유효성 검사에서 실패했을경우[]
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
