import { DataTypes } from "sequelize";
import sequelize from "../setup/sequelize.js";


const Culinary = sequelize.define("Culinary", {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  taste: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, defaultValue: "" },

  foodId: { type: DataTypes.INTEGER, allowNull: false },
  restaurantId: { type: DataTypes.INTEGER, allowNull: false },
});

export default Culinary;
