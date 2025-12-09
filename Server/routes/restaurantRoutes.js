import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Menu from "../models/menu.js";           // ⭐ WAJIB DITAMBAHKAN
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

// ⭐ Route menus harus sebelum `/:id`
router.get("/:id/menus", asyncHandler(async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const menus = await Menu.findAll({
    where: { restaurantId: req.params.id }
  });

  const mapped = menus.map(m => ({
    ...m.dataValues,
    image: m.image ? `${baseUrl}/${m.image}` : null,
  }));

  res.json(mapped);
}));

router.get("/:id", getRestaurantById);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
