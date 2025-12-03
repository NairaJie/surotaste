const Food = require("./Food");
const Restaurant = require("./Restaurant");
const Culinary = require("./Culinary");
const Menu = require("./Menu");
const User = require("./User");
const Review = require("./Review");

// Culinary → Food (many-to-one)
Culinary.belongsTo(Food, { foreignKey: "foodId", as: "food" });

// Culinary → Restaurant (many-to-one)
Culinary.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurant" });

// Menu → Restaurant (many-to-one)
Menu.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
  as: "restaurantMenu",
});


// // Review → User
// Review.belongsTo(User, { foreignKey: "userId", as: "reviewUser" });

// // Review → Restaurant
// Review.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurantReview" });

module.exports = {
  Food,
  Restaurant,
  Culinary,
  Menu,
  User,
  Review
};


