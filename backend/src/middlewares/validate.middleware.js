const { validationResult } = require("express-validator");
const { apiError } = require("../utils/apiError");

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(apiError(400, "Validation failed", errors.array()));
  }
  next();
};

module.exports = validateMiddleware;
