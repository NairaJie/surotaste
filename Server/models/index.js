import sequelize from "../config/db.js"; // Tambahkan ini
import User from "./user.js";
import Restaurant from "./restaurant.js";
import Food from "./food.js";
import Culinary from "./culinary.js";
import Menu from "./menu.js";
import Review from "./review.js";

/* RELASI RESTAURANT */
Restaurant.hasMany(Food, { foreignKey: "restaurantId" });
Food.belongsTo(Restaurant, { foreignKey: "restaurantId" });

Restaurant.hasMany(Menu, { foreignKey: "restaurantId" });
Menu.belongsTo(Restaurant, { foreignKey: "restaurantId" });

Restaurant.hasMany(Culinary, { foreignKey: "restaurantId" });
Culinary.belongsTo(Restaurant, { foreignKey: "restaurantId" });

Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
Review.belongsTo(Restaurant, { foreignKey: "restaurantId" });

/* USER RELATION */
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

/* FOOD RELATION */
Food.hasMany(Culinary, { foreignKey: "foodId" });
Culinary.belongsTo(Food, { foreignKey: "foodId" });

export { sequelize, User, Restaurant, Food, Culinary, Menu, Review }; // Export sequelize juga