const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const { responseHandler } = require("../utils/public-methods.utils");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const cookieOptions = {
  maxAge: 1 * 60 * 60 * 1000, // 1 hr
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

exports.registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return responseHandler(
      res,
      400,
      null,
      `Bad Request, Reason: Missing ${!email ? "email" : "password"}`
    );
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return responseHandler(res, 409, null, "Email already exists.");
    }

    const isFirstUser = (await User.countDocuments()) === 0;
    const user = new User({
      email,
      password,
      role: isFirstUser ? "admin" : "viewer",
    });

    user.createdBy = user.user_id;

    await user.save();

    return responseHandler(res, 201, null, "User created successfully.");
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return responseHandler(
      res,
      400,
      null,
      `Bad Request, Reason: Missing ${!email ? "email" : "password"}`
    );
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return responseHandler(res, 404, null, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responseHandler(res, 400, null, "Invalid credentials");
    }

    const token = jwt.sign({ id: user.user_id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("music-token", token, cookieOptions);

    return responseHandler(res, 200, { token }, "Login successful");
  } catch (error) {
    next(error);
  }
};

//Logout User
exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("music-token", {
      ...cookieOptions,
      maxAge: 0,
    });

    return responseHandler(res, 200, null, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};
