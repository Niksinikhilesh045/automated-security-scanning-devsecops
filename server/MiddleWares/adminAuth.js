const jwt = require("jsonwebtoken");

function adminAuthenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization Token is missing" });
  }
  jwt.verify(token, process.env.DB_KEY, (err, admin) => {
    if (err || admin.role !== "admin") {
      return res.status(401).json({ error: "Admin no longer exists." });
    }
    req.admin = admin;
    next();
  });
}

module.exports = { adminAuthenticateJWT };
