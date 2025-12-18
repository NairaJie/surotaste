import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Menu from "../models/menu.js"; // TETEP
import restaurantController from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/", asyncHandler(restaurantController.create));
router.get("/", asyncHandler(restaurantController.getRestaurants));
router.get("/name/:name", asyncHandler(restaurantController.getByName));

// ⭐ route menus TETEP & POSISI TETEP
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

router.get("/:id", asyncHandler(restaurantController.getRestaurantDetail));
router.put("/:id", asyncHandler(restaurantController.update));
router.delete("/:id", asyncHandler(restaurantController.remove));

export default router;
