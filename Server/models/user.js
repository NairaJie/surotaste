const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true, // null untuk akun Google
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true, // hanya ada untuk akun Google
    },
    photoURL: {
        type: DataTypes.STRING,
        defaultValue: "/profile.png",
    },
    provider: {
        type: DataTypes.ENUM("local", "google"),
        defaultValue: "local",
    }
});

module.exports = User;
