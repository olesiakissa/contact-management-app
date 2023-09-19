const {
  VALIDATION_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  SERVER_ERROR,
} = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
    case UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case SERVER_ERROR:
      res.json({
        title: "Server error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    default:
      console.log("No errors found");
      break;
  }
};

module.exports = { errorHandler };
