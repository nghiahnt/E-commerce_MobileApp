const crypto = require("crypto");
const User = require("../models/user.js");

const verifyEmail = require("../helper/verifyEmail.js")

const auth = {
  registerUser: async ({ name, email, password }) => {
    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        console.log("Email already registered:", email);
        return {
            status: 400,
            message: "Email already registered"
        };
      }

      // Create a new user
      const newUser = new User({ name, email, password });

      // Generate and store the verification token
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");

      // Save the new user
      await newUser.save();

      // Debugging statement to verify data
      // Send the verification email to the user
      verifyEmail(newUser.email, newUser.verificationToken)

      return ({
        status: 201,
        message: "Registration successfull. Please check your email for verification."
      })
    } catch (error) {
        return ({
            status: 500,
            message: "Registration failed"
        })
    }
  },
};

module.exports = auth;
