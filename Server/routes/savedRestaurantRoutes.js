import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import savedRestaurantController from "../controllers/savedRestaurantController.js";

const router = express.Router();

// Save restaurant
router.post("/", asyncHandler(savedRestaurantController.saveRestaurant));

// Unsave restaurant
router.delete(
  "/:userId/:restaurantId",
  asyncHandler(savedRestaurantController.unsaveRestaurant)
);

// Get saved items (FULL DATA)
router.get(
  "/:userId",
  asyncHandler(savedRestaurantController.getUserSavedRestaurants)
);

// Other routes
router.get(
  "/user/:userId",
  asyncHandler(savedRestaurantController.getUserSavedRestaurants)
);

router.get(
  "/check/:userId/:restaurantId",
  asyncHandler(savedRestaurantController.checkSavedStatus)
);

export default router;
