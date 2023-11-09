const express = require("express");
const router = express.Router();

const authRouter = require("./authRouter");

const routes = (app) => {
  router.use("/auth", authRouter);

  return app.use("/api", router);
};

module.exports = routes;
