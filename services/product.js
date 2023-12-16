const Product = require("../models/product.js");
const User = require("../models/user.js");
const uploader = require("../configs/cloudinary");
const createError = require("http-errors");

const productServives = {
  getAllProducts: async () => {
    try {
      const data = await Product.find();
      return {
        status: 200,
        message: "Get all products successfully",
        data: data,
      };
    } catch (error) {
      console.log("Error: ", error);
      return {
        status: 500,
        message: "Product not found",
      };
    }
  },

  createProduct: async (
    { title, price, description, category, quantity },
    files,
    id
  ) => {
    try {
      const uploadPromises = files.map((file) => {
        return uploader.cloudinary.uploader.upload(file.path);
      });
      const uploadResults = await Promise.all(uploadPromises);
      const imageUrls = uploadResults.map((result) => result.url);

      const user = await User.findById(id);
      const CD = user.name;

      // New Product
      const newProduct = new Product({
        title,
        price,
        description,
        category,
        image: imageUrls.map((url) => ({ path: url })),
        quantity,
        CD: CD,
      });

      const savedProduct = await newProduct.save();
      return {
        status: 200,
        message: "Product created successflly",
        data: savedProduct,
      };
    } catch (error) {
      console.log("Error: ", error);
      return {
        status: 500,
        message: "Failed to created new product",
        error: error.message,
      };
    }
  },

  getProductId: async ({ id }) => {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return {
          status: 404,
          message: "Product not found",
          data: [],
        };
      }
      return {
        status: 201,
        message: "Get detail product successfully",
        data: [product],
      };
    } catch (error) {
      console.log(error);
      return {
        status: 501,
        message: error.message,
      };
    }
  },

  deleteProduct: async (productId) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (deletedProduct) {
        console.log("Deleted product:", deletedProduct);
        return {
          status: 201,
          message: "Product deleted successfully",
          data: deletedProduct,
        };
      }
      console.log("Product not found!!");
      return {
        status: 401,
        message: "Product not found!!",
        data: [],
      };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  updateProduct: async (userId, productId, data, files) => {
    try {
      // Get CD
      const user = await User.findById(userId);
      const CD = user.name;
      if (CD) {
        // Upload image
        const photoUrls = await uploader.uploadPhotos(files);
        // Generate new product
        const newProduct = {
          ...data,
          CD: CD,
          image: photoUrls.map((url) => ({ path: url })),
        };
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          newProduct,
          { new: true }
        );
        if (!updatedProduct) {
          return {
            status: 501,
            message: "Product not found",
          };
        }
        return {
          status: 203,
          message: "Update product successfully",
          data: updatedProduct,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 501,
        message: err.message,
      };
    }
  },
};

module.exports = productServives;
