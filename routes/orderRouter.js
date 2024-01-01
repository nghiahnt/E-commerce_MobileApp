const orderRouter = require("express").Router();
const orderController = require("../controllers/order.js");
const { verifyAccessToken } = require("../middlewares/authenticateUser.js");

// Endpoint to store all the orders
orderRouter.post("/store", orderController.storeOrder);

// Endpoint to get orders of a particular user
orderRouter.get("/:userId", orderController.getOrderByUser);

// Endpoint to get cart from a particular user
orderRouter.get("/cart/getAllCart", verifyAccessToken, orderController.getAllCart);

// Endpoint to store item to cart
orderRouter.post("/cart/createCart", verifyAccessToken, orderController.createCart);

// Endpoint to clear all item in cart
orderRouter.delete("/cart/deleteCart", verifyAccessToken, orderController.deleteCart);

module.exports = orderRouter;
