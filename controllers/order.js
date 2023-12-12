const orderServices = require("../services/order.js");

const order = {
  storeOrder: async (req, res, next) => {
    try {
      const { status, message } = await orderServices.storeOrder(req.body);
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  },

  getOrderByUser: async (req, res, next) => {
    try {
        const { status, message } = await orderServices.getOrderByUser(req.params.userId);
        return res.status(status).json(message);
    } catch (error) {
        next(error);
    }
  }
};

module.exports = order;
