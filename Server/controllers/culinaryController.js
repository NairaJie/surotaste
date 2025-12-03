import { Culinary, Food, Restaurant } from "../models/index.js";
import asyncHandler from "../middleware/asyncHandler.js";

// GET ALL
export const getAllCulinary = asyncHandler(async (req, res) => {
  const data = await Culinary.findAll({
    include: [
      { model: Food, as: "food" },
      { model: Restaurant, as: "restaurant" }
    ]
  });

  res.json(data);
});

// GET BY ID
export const getCulinaryById = asyncHandler(async (req, res) => {
  const item = await Culinary.findByPk(req.params.id, {
    include: [
      { model: Food, as: "food" },
      { model: Restaurant, as: "restaurant" }
    ]
  });

  if (!item) return res.status(404).json({ msg: "Not found" });
  res.json(item);
});

// GET BY FOOD ID
export const getByFoodId = asyncHandler(async (req, res) => {
  const items = await Culinary.findAll({
    where: { foodId: req.params.foodId },
    include: [{ model: Restaurant, as: "restaurant" }]
  });

  res.json(items);
});

// CREATE
export const createCulinary = asyncHandler(async (req, res) => {
  const newItem = await Culinary.create(req.body);
  res.status(201).json(newItem);
});

// UPDATE
export const updateCulinary = asyncHandler(async (req, res) => {
  await Culinary.update(req.body, { where: { id: req.params.id } });
  res.json({ msg: "Updated" });
});

// DELETE
export const deleteCulinary = asyncHandler(async (req, res) => {
  await Culinary.destroy({ where: { id: req.params.id } });
  res.json({ msg: "Deleted" });
});
