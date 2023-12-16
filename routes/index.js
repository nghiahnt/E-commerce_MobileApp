const express = require("express");
const router = express.Router();

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");
const productRouter = require("./productRouter");

const routes = (app) => {
  router.use("/auth", authRouter);
  router.use("/user", userRouter);
  router.use("/orders", orderRouter);
  router.use("/product", productRouter);

  // Middleware handle errors
  router.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";
    res.status(statusCode).json({
      Error: {
        status: statusCode,
        message: errorMessage,
      },
    });
  });

  return app.use("/api", router);
};

module.exports = routes;
