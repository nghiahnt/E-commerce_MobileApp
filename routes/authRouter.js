const authRouter = require("express").Router();
const authController = require("../controllers/auth")

// Endpoint to register user 
authRouter.post("/register", authController.registerUser);
// Endpoint to verify the email
authRouter.get("/verify/:token", authController.verifyEmail);
// Endpoint to login the user
authRouter.post("/login", authController.loginUser);

module.exports = authRouter;
