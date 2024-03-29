const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// Registration
const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please add all fields" });
    }

    // Check for duplicate user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Create new user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    res.status(201).json({
      success: true,
      message: "SignUp Successfull",
      data: {
        userId: user._id,
        token: await user.generateToken(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Login
const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (!userExists) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    const isPasswordValid = await userExists.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        success: true,
        message: "Signin Success",
        data: {
          userId: userExists._id,
          username: userExists.username,
          email: userExists.email,
          isAdmin: userExists.isAdmin,
          token: await userExists.generateToken(),
        },
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid Password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { signupUser, signinUser };
