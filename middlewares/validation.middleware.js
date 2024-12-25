const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: errors
        .array()
        .map((err) => err.msg)
        .join(" | "),
    });
  }
  next();
};

module.exports = handleValidationErrors;
