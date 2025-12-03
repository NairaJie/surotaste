const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

module.exports = async (req, res, next) => {
    const { userId, restaurantId } = req.body;

    if (!userId || !restaurantId) {
        return res.status(400).json({ msg: "userId & restaurantId are required" });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) return res.status(404).json({ msg: "Restaurant not found" });

    req.userData = user;
    req.restaurantData = restaurant;

    next();
};
