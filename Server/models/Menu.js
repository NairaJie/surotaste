// models/Menu.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Restaurant = require("./Restaurant");

const Menu = sequelize.define("Menu", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taste: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,   // <--- tambahan atribut image
  }
});

// Relasi
Menu.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
  as: "restaurant",
});

module.exports = Menu;
