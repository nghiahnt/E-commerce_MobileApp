const productRouter = require("express").Router();
const productController = require("../controllers/product.js");
// Multer middleware
const upload = require("../middlewares/multer");

// Endpoint to get all the products available
productRouter.get("/getAllProducts", productController.getAllProducts);

// Endpoint to get product by id
productRouter.get("/getProductById", productController.getProductById);

// Endpoint to create a new product
productRouter.post(
  "/createProduct",
  upload.array("photos", 12),
  productController.createProduct
);

// Endpoint to update a product
productRouter.patch("/updateProduct/:id", productController.updateProduct);

module.exports = productRouter;
