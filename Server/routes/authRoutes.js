import express from "express";
import passport from "../utils/googleAuth.js";
import { register, login, getMe } from "../controllers/authController.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/user.js";

const router = express.Router();

// =============== NORMAL AUTH =============== //
router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

// GET CURRENT USER
router.get("/me", authMiddleware, getMe);

// =============== GOOGLE AUTH =============== //
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  asyncHandler(async (req, res) => {
    const token = jwt.sign(
      { id: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

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

export default router;
