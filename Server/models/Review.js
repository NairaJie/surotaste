// models/Review.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Restaurant = require("./Restaurant");

const Review = sequelize.define("Review", {
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Relationships
Review.belongsTo(User, {
  foreignKey: "userId",
  as: "reviewUser"
});

Review.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
  as: "restaurantReview"
});

module.exports = Review;
