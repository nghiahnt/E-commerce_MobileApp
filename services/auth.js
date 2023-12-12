const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const verifyEmail = require("../helper/verifyEmail.js");
const generateSecretKey = require("../helper/generateSecretKey.js");
// const { response } = require("express");

const auth = {
  registerUser: async ({ name, email, password }) => {
    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        console.log("Email already registered:", email);
        return {
          status: 400,
          message: "Email already registered",
        };
      }

      // Create a new user
      const newUser = new User({ name, email, password });

      // Generate and store the verification token
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");

      // Save the new user
      await newUser.save();

      // Debugging statement to verify data
      console.log("New user registered:", newUser);

      // Send the verification email to the user
      verifyEmail(newUser.email, newUser.verificationToken);

      return {
        status: 201,
        message:
          "Registration successfull. Please check your email for verification.",
      };
    } catch (error) {
      // Debugging statement
      console.log("Error during registration:", error);
      return {
        status: 500,
        message: "Registration failed",
      };
    }
  },

  verifyEmail: async (token) => {
    try {
      // Find the user with the given verification token
      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return {
          status: 404,
          message: "Invalid verification token",
        };
      }
      user.verified = true;
      user.verificationToken = undefined;

      await user.save();

      return {
        status: 200,
        message: "Email verified successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Email verification failed",
      };
    }
  },

  loginUser: async ({ email, password }) => {
    try {
      // Check if the user already exists
      const user = await User.findOne({ email: email });
      if (!user) {
        return {
          status: 401,
          message: "Invalid email or password",
        };
      }

      // Check if the password is correct
      if (user.password !== password) {
        return {
          status: 401,
          message: "Invalid password",
        };
      }

      // Verify email address
      if (user.verified == "false") {
        return {
          status: 404,
          message: "Please verify in your email address",
        };
      }
      // ok - generate a token
      const token = jwt.sign({ userId: user._id }, generateSecretKey());

      console.log({
        message: "Login successful",
        token,
      });
      return {
        message: "Login successful",
        status: 200,
        token: token,
      };
    } catch (error) {
      return {
        message: "Login failed",
        status: 500,
      };
    }
  },
};

module.exports = auth;
