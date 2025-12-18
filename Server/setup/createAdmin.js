import bcrypt from "bcrypt";
import User from "../models/user.js";

const run = async () => {
  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Super Admin",
    email: "admin@surotaste.com",
    password: hashed,
    role: "admin",
  });

  console.log("Admin created!");
};

run();

