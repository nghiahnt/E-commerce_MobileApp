const Product = require("../models/product.js");
const cloudinary = require("../configs/cloudinary.js");

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
    { title, price, description, category, quantity, CD },
    files
  ) => {
    try {
      const uploadPromises = files.map((file) => {
        return cloudinary.uploader.upload(file.path);
      });
      const uploadResults = await Promise.all(uploadPromises);
      const imageUrls = uploadResults.map((result) => result.url);

      // New Product
      const newProduct = new Product({
        title,
        price,
        description,
        category,
        image: imageUrls.map((url) => ({ path: url })),
        quantity,
        CD,
      });

      const savedProduct = await newProduct.save();
      return {
        status: 200,
        message: "Product created successflly",
        data: savedProduct
      }
    } catch (error) {
      console.log("Error: ", error);
      return {
        status: 500,
        message: "Failed to created new product",
        error: error.message,
      }
    }
  },
};

module.exports = productServives;
