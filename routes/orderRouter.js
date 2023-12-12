const orderRouter = require("express").Router();
const orderController = require("../controllers/order.js");

// Endpoint to store all the orders
orderRouter.post("/store", orderController.storeOrder);

// Endpoint to get orders of a particular user
orderRouter.get("/:userId", orderController.getOrderByUser);

module.exports = orderRouter;
