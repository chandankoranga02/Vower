const { verifyToken } = require("../utils/jwt");

/**
 * authenticate
 *
 * Express middleware that validates a JWT from the Authorization header.
 * Usage: router.get('/protected', authenticate, handler)
 *
 * Expects:  Authorization: Bearer <token>
 * Attaches: req.user = { userId, provider, iat, exp }
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Authentication required. Please log in." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Authentication token missing." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // { userId, provider, iat, exp }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Session expired. Please log in again." });
    }

    return res.status(401).json({ msg: "Invalid authentication token." });
  }
};

module.exports = authenticate;
