const User = require("../models/user");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const userAccessToken = async () => {
  const user = await User.findOne({}, "accessToken");
  return user.accessToken;
};

module.exports.verifyAccessToken = async (req, res, next) => {
  try {
    const headersToken = req.headers["authorization"];
    const accessTokenDB = await userAccessToken();
    try {
      // jwt.verify(accessTokenDB, headersToken, (err, payload) => {
      //   if (err) {
      //     return next(createError.Unauthorized("Faild to verify user!"));
      //   }
      //   req.token = payload;
      //   next();
      // });
      if (headersToken !== accessTokenDB) {
        return next(createError.Unauthorized("Faild to verify user!"));
      }
      req.token = headersToken;
      next();
    } catch (error) {
      return next(createError.Unauthorized("Faild to verify!"));
    }
  } catch (error) {
    res.status(500).json({ error: error.message, log: "Error with authenticate" });
  }
};
