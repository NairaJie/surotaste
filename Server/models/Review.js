import { DataTypes } from "sequelize";
import sequelize from "../setup/sequelize.js";


const Review = sequelize.define("Review", {
  rating: { type: DataTypes.FLOAT, allowNull: false },
  description: DataTypes.TEXT,

  userId: { type: DataTypes.INTEGER, allowNull: false },
  restaurantId: { type: DataTypes.INTEGER, allowNull: false },
});

export default Review;
