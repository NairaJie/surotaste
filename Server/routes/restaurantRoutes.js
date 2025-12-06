// routes/restaurantRoutes.js
import express from "express";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantByName,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/", createRestaurant);
router.get("/", getRestaurants);
router.get("/name/:name", getRestaurantByName);
router.get("/:id", getRestaurantById);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
