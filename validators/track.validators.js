const { query, body, param } = require("express-validator");

exports.getTracks = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer."),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a non-negative integer."),
  query("artist_id")
    .optional()
    .isUUID()
    .withMessage("Artist ID must be a valid isUUID."),
  query("album_id")
    .optional()
    .isUUID()
    .withMessage("Album ID must be a valid isUUID."),
  query("hidden")
    .optional()
    .isBoolean()
    .withMessage("Hidden must be a boolean value."),
];

exports.addTrack = [
  body("artist_id").isUUID().withMessage("Artist ID must be a valid UUID"),
  body("album_id").isUUID().withMessage("Album ID must be a valid UUID"),
  body("name")
    .isString()
    .withMessage("Track name must be a string")
    .notEmpty()
    .withMessage("Track name is required"),
  body("duration")
    .isInt({ min: 0 })
    .withMessage("Duration must be a positive integer"),
  body("hidden").isBoolean().withMessage("Hidden must be a boolean"),
];

exports.updateTrack = [
  param("id")
    .notEmpty()
    .withMessage("Album ID is required")
    .isUUID()
    .withMessage("Album ID must be a valid UUID"),
  body("name").optional().isString().withMessage("Track name must be a string"),
  body("duration")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Duration must be a positive integer"),
  body("hidden").optional().isBoolean().withMessage("Hidden must be a boolean"),
];

exports.validateId = [
  param("id")
    .notEmpty()
    .withMessage("Album ID is required")
    .isUUID()
    .withMessage("Album ID must be a valid UUID"),
];
