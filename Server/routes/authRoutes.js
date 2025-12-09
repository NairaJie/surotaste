import express from "express";
import passport from "../utils/googleAuth.js";
import { register, login, getMe } from "../controllers/authController.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/user.js";
import upload from "../middleware/uploadMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users"); // <-- folder user
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `user-${req.user.id}${ext}`); // nama file unik per user
  },
});

const uploadPhoto = multer({ storage });

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

router.post(
  "/upload-photo",
  authMiddleware,
  uploadPhoto.single("photo"),
  asyncHandler(async (req, res) => {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const user = await User.findByPk(req.user.id);
    user.image = `/uploads/users/${req.file.filename}`; // simpan path relatif
    await user.save();

    res.json({ success: true, photoURL: user.image });
  })
);
export default router;
