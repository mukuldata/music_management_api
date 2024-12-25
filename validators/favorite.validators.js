const { body, param, query } = require("express-validator");

exports.addFavorite = [
  body("category")
    .isIn(["artist", "album", "track"])
    .withMessage("Invalid category, must be artist, album, or track"),
  body("item_id")
    .notEmpty()
    .withMessage("Item ID is required")
    .isUUID()
    .withMessage("Invalid item ID format, should be UUID"),
];

exports.deleteFavorite = [
  param("favorite_id")
    .notEmpty()
    .withMessage("Favorite ID is required")
    .isUUID()
    .withMessage("Invalid Favorite ID format, should be UUID"),
];

exports.getFavorites = [
  param("category")
    .isIn(["artist", "album", "track"])
    .withMessage("Invalid category, must be artist, album, or track"),
  query("limit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Limit must be a positive integer."),

  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a non-negative integer."),
];
