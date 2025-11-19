const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Food = sequelize.define("Food", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.TEXT,
  },
  meals: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  history: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,
  }
});

module.exports = Food;