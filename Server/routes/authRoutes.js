import express from "express";
import passport from "../utils/googleAuth.js";
import authController from "../controllers/authController.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/user.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `user-${req.user.id}${ext}`);
  },
});

const uploadPhoto = multer({ storage });

// =============== NORMAL AUTH =============== //
router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

// GET CURRENT USER (PATH TETAP)
router.get("/me", authMiddleware, asyncHandler(authController.getMe));

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

    res.redirect(`http://localhost:5173?token=${token}`);
  })
);

// =============== UPDATE PROFILE (DIBIARIN) =============== //
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
        photoURL: user.photoURL,
      },
    });
  })
);

// =============== UPLOAD PHOTO (DIBIARIN) =============== //
router.post(
  "/upload-photo",
  authMiddleware,
  uploadPhoto.single("photo"),
  asyncHandler(async (req, res) => {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    const user = await User.findByPk(req.user.id);
    user.image = `/uploads/users/${req.file.filename}`;
    await user.save();

    res.json({ success: true, photoURL: user.image });
  })
);

export default router;
