const { query, param, body } = require("express-validator");

exports.getArtists = [
  query("limit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Limit must be a positive integer."),

  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a non-negative integer."),

  query("grammy")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("Grammy must be an integer between 0 and 10."),

  query("hidden")
    .optional()
    .isBoolean()
    .withMessage("Hidden must be a boolean (true or false)."),
];

exports.validateArtistId = [
  param("id")
    .notEmpty()
    .withMessage("Artist ID is required")
    .isUUID()
    .withMessage("Invalid artist ID format, should be UUID"),
];

exports.addArtist = [
  body("name")
    .notEmpty()
    .withMessage("Artist name is required.")
    .isString()
    .withMessage("Artist name must be a string."),
  body("grammy")
    .isInt({ min: 0 })
    .withMessage("Grammy count must be a non-negative integer.")
    .isInt({ max: 10 })
    .withMessage("Maximum Grammy count is 10."),
  body("hidden")
    .isBoolean()
    .withMessage("Hidden status must be a boolean value."),
];

exports.updateArtist = [
  param("id")
    .notEmpty()
    .withMessage("Artist ID is required")
    .isUUID()
    .withMessage("Invalid artist ID format, should be UUID"),
  body("name")
    .optional()
    .isString()
    .withMessage("Artist name must be a string."),
  body("grammy")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Grammy count must be a non-negative integer.")
    .isInt({ max: 10 })
    .withMessage("Maximum Grammy count is 10."),
  body("hidden")
    .optional()
    .isBoolean()
    .withMessage("Hidden status must be a boolean value."),
];
