const userServices = require("../services/user.js");

const user = {
  add_address: async (req, res, next) => {
    try {
      const { message, status } = await userServices.add_address(req.body);
      return res.status(status).json({ message });
    } catch (error) {
      next(error);
    }
  },

  get_addresses: async (req, res, next) => {
    try {
      const { message, status } = await userServices.get_addresses(
        req.params.userId
      );
      return res.status(status).json({ message });
    } catch (error) {
      next(error);
    }
  },

  getUserProfile: async (req, res, next) => {
    try {
        const { message, status } = await userServices.getUserProfile(req.params.userId);
        return res.status(status).json({ message });
    } catch (error) {
        next(error);        
    }
  }
};

module.exports = user;
