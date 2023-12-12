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
  router.use("/products", productRouter);

  return app.use("/api", router);
};

module.exports = routes;
