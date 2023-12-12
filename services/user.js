const User = require("../models/user.js");

const user = {
  add_address: async ({ userId, address }) => {
    try {
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      user.addresses.push(address);

      // Update to backend
      await user.save();

      return {
        status: 200,
        message: "Addresses added successfully",
      };
    } catch (error) {
      console.log("Error during add address", error);
      return {
        status: 500,
        message: "Error adding address",
      };
    }
  },

  get_addresses: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      const addresses = user.addresses;

      return {
        status: 200,
        message: addresses,
      };
    } catch (error) {
      console.log("Error", error);
      return {
        status: 500,
        message: "Error retrieveing the addresses",
      };
    }
  },

  // Get user profile information
  getUserProfile: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return {
          status: 404,
          message: "User not found",
        };
      }

      return {
        status: 200,
        message: user,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error during get user profile!",
      };
    }
  },
};

module.exports = user;
