const Food = require("./Food");
const Restaurant = require("./Restaurant");
const Culinary = require("./Culinary");
const Menu = require("./Menu");

// Culinary → Food (many-to-one)
Culinary.belongsTo(Food, { foreignKey: "foodId", as: "food" });

// Culinary → Restaurant (many-to-one)
Culinary.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurant" });

// Menu → Restaurant (many-to-one)
Menu.belongsTo(Restaurant, {
  foreignKey: "restaurantId",
  as: "restaurantMenu",
});


module.exports = {
  Food,
  Restaurant,
  Culinary,
  Menu
};
