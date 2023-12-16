const authServices = require("../services/auth.js");

// Main purpose is responsive the status
const auth = {
  registerUser: async (req, res, next) => {
    try {
      const { message, status } = await authServices.registerUser(req.body);
      return res.status(status).json({ message });
    } catch (err) {
      next(err);
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const { status, message } = await authServices.verifyEmail(
        req.params.token
      );
      return res.status(status).json({ message });
    } catch (err) {
      next(err);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { status, message = "", token } = await authServices.loginUser(req.body);
      return res.status(status).json({ status, message, token });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = auth;
