const { query, body, check } = require("express-validator");

exports.addUser = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .trim(),

  body("role")
    .isIn(["admin", "editor", "viewer"])
    .withMessage("Role must be one of the following: admin, editor, viewer.")
    .trim(),
];

exports.getUsers = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit should be a positive integer")
    .toInt(),

  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset should be a non-negative integer")
    .toInt(),

  query("role")
    .optional()
    .custom((value) => {
      // If role is provided, ensure it's one of the allowed values
      if (
        value &&
        !["admin", "editor", "viewer"].includes(value.toLowerCase())
      ) {
        throw new Error("Role should be one of: admin, editor, viewer");
      }
      return true;
    })
    .trim(),
];

exports.validateUserId = [
  check("id")
    .isUUID()
    .withMessage("Invalid user ID format. It should be a valid UUID.")
    .trim(),
];

exports.validatePasswordChange = [
  body("old_password")
    .notEmpty()
    .withMessage("Old password is required.")
    .isLength({ min: 6 })
    .withMessage("Old password must be at least 6 characters long.")
    .trim(),

  body("new_password")
    .notEmpty()
    .withMessage("New password is required.")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long.")
    .trim(),
];
