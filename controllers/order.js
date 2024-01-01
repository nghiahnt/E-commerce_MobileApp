const orderServices = require("../services/order.js");
const { decodeToken } = require("../decodeToken");

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
      const { status, message } = await orderServices.getOrderByUser(
        req.params.userId
      );
      return res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  },

  getAllCart: async (req, res, next) => {
    try {
      const userId = decodeToken(req.token);
      const { status, message, data } = await orderServices.getAllCart(userId);
      return res.status(status).json({ message: message, data: data });
    } catch (error) {
      next(error);
    }
  },

  createCart: async (req, res, next) => {
    try {
      const cartData = req.body;
      const userId = decodeToken(req.token);
      const { status, message, data } = await orderServices.createCart(
        cartData,
        userId
      );
      return res.status(status).json({ message: message, data: data });
    } catch (error) {
      next(error);
    }
  },

  deleteCart: async (req, res, next) => {
    try {
      const userId = decodeToken(req.token);
      const { status, message, data } = await orderServices.deleteCart(userId);
      return res.status(status).json({ message: message, data: data });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = order;
