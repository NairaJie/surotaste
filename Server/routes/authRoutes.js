const express = require("express");
const router = express.Router();
const passport = require("../utils/googleAuth");
const { register, login, getMe } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// =============== NORMAL AUTH =============== //
router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

// GET CURRENT USER
router.get("/me", authMiddleware, getMe);


// =============== GOOGLE AUTH =============== //
// Step 1 — Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2 — Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  asyncHandler(async (req, res) => {

    const token = jwt.sign(
      { id: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // GANTI sesuai FE kamu (5173 / 3000 terserah)
    const redirectURL = `http://localhost:5173?token=${token}`;

    res.redirect(redirectURL);
  })
);


// =============== UPDATE PROFILE =============== //
router.put(
  "/update",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { name } = req.body;

    // ambil user dari database
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.name = name || user.name;

    await user.save();

    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL
      }
    });
  })
);

module.exports = router;
