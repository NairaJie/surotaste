import express from "express";
import foodController from "../controllers/foodController.js";
import Food from "../models/food.js";

const router = express.Router();

// CREATE
router.post("/", foodController.createFood);

// GET food by name
router.get("/name/:name", async (req, res) => {
  try {
    const food = await Food.findOne({ where: { name: req.params.name } });
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
router.get("/", foodController.getFoods);
router.get("/:id", foodController.getFoodById);

// UPDATE
router.put("/:id", foodController.updateFood);

// DELETE
router.delete("/:id", foodController.deleteFood);

export default router;
