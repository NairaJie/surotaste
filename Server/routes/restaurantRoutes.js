// routes/restaurantRoutes.js
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const restaurantController = require("../controllers/restaurantController");

// CREATE
router.post("/", restaurantController.createRestaurant);

// GET restaurant by name
router.get("/name/:name", async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { name: req.params.name }
    });

    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
router.get("/", restaurantController.getRestaurants);
router.get("/:id", restaurantController.getRestaurantById);

// UPDATE
router.put("/:id", restaurantController.updateRestaurant);

// DELETE
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
