import { DataTypes } from "sequelize";
import sequelize from "../setup/sequelize.js";


const SavedRestaurant = sequelize.define("SavedRestaurant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default SavedRestaurant;
