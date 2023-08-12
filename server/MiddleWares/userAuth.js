const jwt = require("jsonwebtoken");

function userAuthenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization Token is missing" });
  }
  jwt.verify(token, process.env.DB_KEY, (err, user) => {
    if (err || user.role === "admin") {
      return res.status(401).json({ error: "User no longer exists." });
    }
    req.user = user;
    next();
  });
}

module.exports = { userAuthenticateJWT };
