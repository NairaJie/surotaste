// models/Restaurant.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Restaurant = sequelize.define("Restaurant", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
  },
  openHours: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.STRING,
  },
  instagram: {
    type: DataTypes.STRING,
  },
  whatsapp: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  mapsLink: {
    type: DataTypes.STRING,
  },
});

module.exports = Restaurant;
