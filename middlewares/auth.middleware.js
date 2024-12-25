const jwt = require("jsonwebtoken");
const { responseHandler } = require("../utils/public-methods.utils");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return responseHandler(res, 400, null, "Bad Request", null);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findOne({ user_id: decoded.id });

    console.log("req.user", req.user);

    next();
  } catch (error) {
    return responseHandler(
      res,
      401,
      null,
      "Unauthorized Access",
      error.message
    );
  }
};

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return responseHandler(
        res,
        403,
        null,
        "Forbidden Access/Operation not allowed.",
        null
      );
    }
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };
