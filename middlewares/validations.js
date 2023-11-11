var createError = require("http-errors");

const registerValidate = require("../validations.js");

const authValid = (req, res, next) => {
  const { error } = registerValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
