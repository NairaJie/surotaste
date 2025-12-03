import Food from "../models/food.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createFood = asyncHandler(async (req, res) => {
  const newFood = await Food.create(req.body);
  res.status(201).json({ message: "Food created", data: newFood });
});

export const getFoods = asyncHandler(async (req, res) => {
  const foods = await Food.findAll();
  res.json(foods);
});

export const getFoodById = asyncHandler(async (req, res) => {
  const food = await Food.findByPk(req.params.id);
  if (!food) return res.status(404).json({ msg: "Food not found" });
  res.json(food);
});

export const updateFood = asyncHandler(async (req, res) => {
  const food = await Food.findByPk(req.params.id);
  if (!food) return res.status(404).json({ msg: "Food not found" });

  await food.update(req.body);
  res.json({ message: "Updated", data: food });
});

export const deleteFood = asyncHandler(async (req, res) => {
  const food = await Food.findByPk(req.params.id);
  if (!food) return res.status(404).json({ msg: "Food not found" });

  await food.destroy();
  res.json({ message: "Deleted" });
});

export default {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood
};
