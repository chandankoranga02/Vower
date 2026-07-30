const { verifyToken } = require("../utils/jwt");

const authenticate = (req, res, next) => {
  const token = req.cookies.vower;

  if (!token) {
    return res.status(401).json({
      msg: "Authentication required. Please log in.",
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // { userId, provider, iat, exp }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        msg: "Session expired. Please log in again.",
      });
    }

    return res.status(401).json({
      msg: "Invalid authentication token.",
    });
  }
};

module.exports = authenticate;