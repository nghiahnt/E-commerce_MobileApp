const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: [{ path: String }],
  createAt: {
    type: Date,
    default: Date.now(),
  },
  quantity: {
    type: Number,
    default: 0,
  },
  CD: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
