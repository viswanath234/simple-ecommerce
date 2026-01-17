const User = require("../models/user.model");
const { apiResponse } = require("../utils/apiResponse");
const { apiError } = require("../utils/apiError");
const { generateToken } = require("../utils/generateToken");

const getUserData = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  delete userObj.password;
  return userObj;
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(apiError(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(apiError(400, "User already exists"));
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);

    res
      .status(201)
      .json(
        apiResponse(
          201,
          { user: getUserData(user), token },
          "User registered successfully"
        )
      );
  } catch (error) {
    res.status(500).json(apiError(500, error.message));
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(apiError(400, "Email and password are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(apiError(404, "User not found"));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json(apiError(401, "Invalid password"));
    }

    const token = generateToken(user._id);

    res
      .status(200)
      .json(
        apiResponse(200, { user: getUserData(user), token }, "Login successful")
      );
  } catch (error) {
    res.status(500).json(apiError(500, error.message));
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res
      .status(200)
      .json(apiResponse(200, getUserData(user), "User fetched successfully"));
  } catch (error) {
    res.status(500).json(apiError(500, error.message));
  }
};
