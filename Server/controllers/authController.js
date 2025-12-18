import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  findUserById,
  createLocalUser,
} from "../repositories/userRepo.js";

// REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await findUserByEmail(email);
  if (exists) {
    return res.status(400).json({ msg: "Email already used" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const userId = await createLocalUser({ name, email, password: hashed });

  res.json({
    success: true,
    message: "Register success",
    userId,
  });
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ msg: "User not found" });

  if (user.provider !== "local") {
    return res.status(400).json({ msg: "Login with Google instead" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    success: true,
    message: "Login success",
    token,
    user,
  });
};

// GET ME
const getMe = async (req, res) => {
  const user = await findUserById(req.user.id);
  res.json({ success: true, user });
};

export default {
  register,
  login,
  getMe,
};
