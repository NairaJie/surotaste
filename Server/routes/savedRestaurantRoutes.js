import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import SavedRestaurant from "../models/savedRestaurant.js";
import Restaurant from "../models/restaurant.js";

import {
    saveRestaurant,
    unsaveRestaurant,
    getUserSavedRestaurants,
    checkSavedStatus,
} from "../controllers/savedRestaurantController.js";

const router = express.Router();

// Save restaurant
router.post("/", saveRestaurant);

// Unsave restaurant
router.delete("/:userId/:restaurantId", unsaveRestaurant);


// Get saved items (FULL DATA)
router.get("/:userId", asyncHandler(async (req, res) => {
    const items = await SavedRestaurant.findAll({
        where: { userId: req.params.userId },
        include: [
            {
                model: Restaurant,
                as: "restaurant",
            }
        ]
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const mapped = items.map(s => ({
        id: s.id, // ID savedRestaurant
        restaurantId: s.restaurant.id,
        name: s.restaurant.name,
        image: `${baseUrl}/${s.restaurant.image}`,
        rating: s.restaurant.rating,
        region: s.restaurant.region,
        restaurantId: s.restaurant.id,
    }));

    res.json(mapped);
}));

// Other routes
router.get("/user/:userId", getUserSavedRestaurants);
router.get("/check/:userId/:restaurantId", checkSavedStatus);

export default router;
