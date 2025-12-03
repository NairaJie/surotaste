import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Food = sequelize.define("Food", {
  name: { type: DataTypes.STRING, allowNull: false },
  category: DataTypes.TEXT,
  meals: DataTypes.TEXT,
  description: DataTypes.TEXT,
  history: DataTypes.TEXT,
  image: DataTypes.STRING,

  restaurantId: { type: DataTypes.INTEGER },
});

export default Food;
