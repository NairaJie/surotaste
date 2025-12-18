import { DataTypes } from "sequelize";
import sequelize from "../setup/sequelize.js";


const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  googleId: DataTypes.STRING,

  // DIGANTI DI SINI
  image: { type: DataTypes.STRING, defaultValue: "/profile.png" },

  provider: { type: DataTypes.ENUM("local", "google"), defaultValue: "local" },
  role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
});

export default User;
