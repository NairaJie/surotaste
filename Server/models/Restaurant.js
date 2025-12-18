import { DataTypes } from "sequelize";
import sequelize from "../setup/sequelize.js";


const Restaurant = sequelize.define("Restaurant", {
  name: { type: DataTypes.STRING, allowNull: false },
  rating: DataTypes.FLOAT,
  openHours: DataTypes.STRING,
  description: DataTypes.TEXT,
  location: DataTypes.STRING,
  instagram: DataTypes.STRING,
  whatsapp: DataTypes.STRING,
  image: DataTypes.STRING,
  mapsLink: DataTypes.STRING,
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Restaurant;
