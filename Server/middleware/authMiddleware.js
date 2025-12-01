const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ success: false, message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ambil user dari DB
    const user = await User.findByPk(decoded.id);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    req.user = user; // BUKAN decoded, tapi instance user Sequelize
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
