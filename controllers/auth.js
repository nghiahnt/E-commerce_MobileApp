const authServices = require("../services/auth.js");

// Main purpose is responsive the status
const auth = {
  registerUser: async (req, res, next) => {
    try {
      const { message, status } = await authServices.registerUser(req.body);
      return res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = auth;
