const Food = require("./Food");
const Restaurant = require("./Restaurant");
const Culinary = require("./Culinary");

// Culinary → Food (many-to-one)
Culinary.belongsTo(Food, {
    foreignKey: "foodId",
    as: "food",
});

// Culinary → Restaurant (many-to-one)
Culinary.belongsTo(Restaurant, {
    foreignKey: "restaurantId",
    as: "restaurant",
});

module.exports = {
    Food,
    Restaurant,
    Culinary
};
