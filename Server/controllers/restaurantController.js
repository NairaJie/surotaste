// controllers/restaurantController.js
import Restaurant from "../models/restaurant.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json(restaurant);
});

export const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

export const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  if (!restaurant) return res.status(404).json({ msg: "Not found" });
  res.json(restaurant);
});

export const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  if (!restaurant) return res.status(404).json({ msg: "Not found" });
  await restaurant.update(req.body);
  res.json(restaurant);
});

export const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  if (!restaurant) return res.status(404).json({ msg: "Not found" });
  await restaurant.destroy();
  res.json({ msg: "Deleted" });
});
