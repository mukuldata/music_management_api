const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { responseHandler } = require("../utils/public-methods.utils");

exports.getUsers = async (req, res, next) => {
  const requestingUser = req.user;

  try {
    // Get query parameters for pagination and filtering
    const limit = parseInt(req.query.limit, 10) || 5;
    const offset = parseInt(req.query.offset, 10) || 0;
    const role = req.query.role;

    // Build query object
    const query = { createdBy: requestingUser.user_id };
    if (role) {
      query.role = role.toLowerCase();
    }

    // Fetch users with pagination
    const users = await User.find(query)
      .skip(offset)
      .limit(limit)
      .select("user_id email role created_at -_id ");

    return responseHandler(res, 200, users, "Users retrieved successfully.");
  } catch (error) {
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return responseHandler(res, 400, null, "Bad Request", null);
    }

    if (role == "admin") {
      return responseHandler(
        res,
        400,
        null,
        "Bad Request: Single admin allowed",
        null
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return responseHandler(res, 409, null, "Email already exists.", null);
    }

    // Create new user
    const newUser = new User({
      email,
      password,
      role,
      createdBy: req.user.user_id,
    });

    await newUser.save();

    return responseHandler(res, 201, null, "User created successfully.", null);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ user_id: id });

    if (!user) {
      return responseHandler(res, 404, null, "User not found.", null);
    }

    if (user.role === "admin") {
      return responseHandler(
        res,
        403,
        null,
        "Cannot delete an admin user.",
        null
      );
    }

    const deletedUser = await User.findOneAndDelete({ user_id: id });

    if (!deletedUser) {
      return responseHandler(res, 404, null, "User not found.", null);
    }

    return responseHandler(res, 200, null, "User deleted successfully.", null);
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { old_password, new_password } = req.body;
    const requestingUser = req.user;

    const user = await User.findOne({ user_id: requestingUser.user_id });
    if (!user) {
      return responseHandler(res, 404, null, "User not found.", null);
    }

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return responseHandler(
        res,
        403,
        null,
        "Forbidden Access: Incorrect old password.",
        null
      );
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await User.updateOne(
      { user_id: requestingUser.user_id },
      { $set: { password: hashedPassword } }
    );

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
