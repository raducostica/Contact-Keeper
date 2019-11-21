const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token
  // checking to see if there is a token in the header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }

  try {
    // getting payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    // moves to next user
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
