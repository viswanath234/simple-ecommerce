const jwt = require("jsonwebtoken");
const { apiError } = require("../utils/apiError");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json(apiError(401, "Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(apiError(401, "Invalid token"));
  }
};

module.exports = authMiddleware;
