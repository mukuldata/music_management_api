const { query, body, param } = require("express-validator");

exports.getAlbums = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a non-negative integer"),
  query("artist_id").optional().isUUID().withMessage("Invalid artist ID"),
  query("hidden")
    .optional()
    .isBoolean()
    .withMessage("Hidden must be a boolean"),
];

exports.addAlbum = [
  body("artist_id")
    .notEmpty()
    .withMessage("Artist ID is required")
    .isString()
    .withMessage("Artist ID must be a string"),
  body("name")
    .notEmpty()
    .withMessage("Album name is required")
    .isString()
    .withMessage("Album name must be a string"),
  body("year")
    .notEmpty()
    .withMessage("Year is required")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(
      "Year must be a valid integer between 1900 and the current year"
    ),
  body("hidden")
    .notEmpty()
    .withMessage("Hidden is required")
    .isBoolean()
    .withMessage("Hidden must be a boolean"),
];

exports.updateAlbum = [
  param("id")
    .notEmpty()
    .withMessage("Album ID is required")
    .isString()
    .withMessage("Album ID must be a valid string"),
  body("name").optional().isString().withMessage("Name must be a valid string"),
  body("year")
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Year must be an integer between 1900 and the current year"),
  body("hidden").optional().isBoolean().withMessage("Hidden must be a boolean"),
];

exports.validateId = [
  param("id")
    .notEmpty()
    .withMessage("Album ID is required")
    .isUUID()
    .withMessage("Album ID must be a valid UUID"),
];
