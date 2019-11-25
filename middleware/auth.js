const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // we verify token, pull out payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // set user in payload to req.user
    req.user = decoded.user;

    // call next
    next();
  } catch (error) {
    res.status(401).json({ msg: "token not valid" });
  }
};
