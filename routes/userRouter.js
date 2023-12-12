const userRouter = require("express").Router();
const userController = require("../controllers/user");

// Endpoint to store a new address
userRouter.post("/addresses", userController.add_address);

// Endpoint to get all the addresses of a particular user
userRouter.get("/addresses/:userId", userController.get_addresses);

// Endpoint to get the user profile
userRouter.get("/profile/:userId", userController.getUserProfile);

module.exports = userRouter;
