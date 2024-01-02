const User = require("../models/user");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports.verifyAccessToken = async (req, res, next) => {
  try {
    const userAccessToken = async () => {
      const DBToken = await User.findOne({
        accessToken: req.headers["authorization"].split(" ")[1],
      });
      return DBToken.accessToken;
    };

    const headersToken = req.headers["authorization"].split(" ")[1];
    const accessTokenDB = await userAccessToken();
    console.log(headersToken);
    console.log(accessTokenDB);
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
