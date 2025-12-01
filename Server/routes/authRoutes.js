const express = require("express");
const router = express.Router();
const passport = require("../utils/googleAuth");
const { register, login, getMe } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");

// Normal Auth
router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

// Get current user
router.get("/me", authMiddleware, getMe);

// Google Login Step 1 – redirect
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  asyncHandler(async (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const redirectURL = `http://localhost:3000?token=${token}`;
    res.redirect(redirectURL);
  })
);

module.exports = router;
