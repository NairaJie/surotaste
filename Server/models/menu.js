import { DataTypes } from "sequelize";
import sequelize from "../setup/sequelize.js";


const Menu = sequelize.define("Menu", {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  taste: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  image: DataTypes.STRING,

  restaurantId: { type: DataTypes.INTEGER, allowNull: false }
});

export default Menu;
