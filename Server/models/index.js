import sequelize from "../setup/sequelize.js";
import User from "./user.js";
import Restaurant from "./restaurant.js"; // Ubah dari Restaurant.js ke restaurant.js
import Food from "./food.js";
import Menu from './menu.js';             // Ubah dari Menu.js ke menu.js
import Culinary from "./culinary.js";
import Review from "./review.js";
import SavedRestaurant from "./savedRestaurant.js";


/* RELASI RESTAURANT */

Restaurant.hasMany(Menu, { foreignKey: "restaurantId", as: "menus" });
Menu.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurant" });


Restaurant.hasMany(Culinary, { foreignKey: "restaurantId", as: "culinaries" });
Culinary.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurant" });

Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
Review.belongsTo(Restaurant, { foreignKey: "restaurantId" });

/* USER RELATION */
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

/* FOOD RELATION */
Food.hasMany(Culinary, { foreignKey: "foodId", as: "culinaries" });
Culinary.belongsTo(Food, { foreignKey: "foodId", as: "food" });

/* SAVED RESTAURANTS RELATION (Many-to-Many) */
SavedRestaurant.belongsTo(Restaurant, { 
  foreignKey: "restaurantId",
  as: "restaurant"
});

Restaurant.hasMany(SavedRestaurant, {
  foreignKey: "restaurantId",
});


export { sequelize, User, Restaurant, Food, Culinary, Menu, Review, SavedRestaurant };
