const productServives = require("../services/product.js");

// Consider trycatch below block code
const productController = {
  getAllProducts: async (req, res, next) => {
    try {
      const { message, status, data } = await productServives.getAllProducts();
      return res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  },

  getProductById: async (req, res, next) => {
    const { message, status, data } = await productServives.getProductById(req.params);
  },

  createProduct: async (req, res, next) => {
    try {
      const files = req.files;
      const { message, status, data } = await productServives.createProduct(
        req.body,
        files
      );
      return res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {

  }
};

module.exports = productController;
