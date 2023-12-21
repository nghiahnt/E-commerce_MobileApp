const productRouter = require("express").Router();
const productController = require("../controllers/product.js");
// Multer middleware
const upload = require("../middlewares/multer");
const { verifyAccessToken } = require("../middlewares/authenticateUser.js");

// Endpoint to get all the products available
productRouter.get("/getAllProducts", productController.getAllProducts);

// Endpoint to get product by id
productRouter.get("/getProductId/:id", productController.getProductById);

// Endpoint to get product by category
productRouter.get("/getProductCategory/:category", productController.getProductCategory);

// Endpoint to create a new product
productRouter.post(
  "/createProduct",
  upload.array("photos", 12),
  verifyAccessToken,
  productController.createProduct
);

// Endpoint to update a product
productRouter.patch(
  "/updateProduct/:id",
  upload.array("photos", 12),
  verifyAccessToken,
  productController.updateProduct
);

// Endpoint to delete a product
productRouter.delete(
  "/deleteProduct/:id",
  verifyAccessToken,
  productController.deleteProduct
);

module.exports = productRouter;
