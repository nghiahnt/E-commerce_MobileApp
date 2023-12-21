const productServives = require("../services/product.js");
const { decodeToken } = require("../decodeToken");

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
    try {
      const {
        status,
        message,
        data = [],
      } = await productServives.getProductId(req.params);
      return res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  },

  getProductCategory: async (req, res, next) => {
    const category = req.params.category;
    try {
      const {
        status,
        message,
        data = [],
      } = await productServives.getProductCategory(category);
      return res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  },

  createProduct: async (req, res, next) => {
    try {
      const files = req.files;
      const token = req.token;
      const id = decodeToken(token);
      const {
        message,
        status,
        data = [],
      } = await productServives.createProduct(req.body, files, id);
      return res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    const userId = decodeToken(req.token); // User ID
    const productId = req.params.id; // Product ID
    const productData = req.body; // Object of data
    const files = req.files; // Array of files
    try {
      const { status, message, data } = await productServives.updateProduct(
        userId,
        productId,
        productData,
        files
      );
      return res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    const params = req.params;
    const productId = params.id;
    try {
      const { status, message, data } = await productServives.deleteProduct(
        productId
      );
      return res.status(status).json({ status, message, data });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
