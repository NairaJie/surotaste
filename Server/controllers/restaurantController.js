// controllers/restaurantController.js
import Restaurant from "../models/restaurant.js";
import asyncHandler from "../middleware/asyncHandler.js";

// GET ALL
export const getRestaurants = asyncHandler(async (req, res) => {
  const data = await Restaurant.findAll();
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const mapped = data.map(item => ({
    ...item.dataValues,

    // FULL URL IMAGE
    image: item.image ? `${baseUrl}/${item.image}` : null,
  }));

  res.json(mapped);
});

// GET BY ID
export const getRestaurantById = asyncHandler(async (req, res) => {
  const item = await Restaurant.findByPk(req.params.id);

  if (!item) return res.status(404).json({ msg: "Not found" });

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  res.json({
    ...item.dataValues,
    image: item.image ? `${baseUrl}/${item.image}` : null,
  });
});

// GET BY NAME
export const getRestaurantByName = asyncHandler(async (req, res) => {
  const item = await Restaurant.findOne({ where: { name: req.params.name } });

  if (!item) return res.status(404).json({ msg: "Not found" });

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  res.json({
    ...item.dataValues,
    image: item.image ? `${baseUrl}/${item.image}` : null,
  });
});

// CREATE
export const createRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json(restaurant);
});

// UPDATE
export const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  if (!restaurant) return res.status(404).json({ msg: "Not found" });

  await restaurant.update(req.body);
  res.json(restaurant);
});

// DELETE
export const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  if (!restaurant) return res.status(404).json({ msg: "Not found" });

  await restaurant.destroy();
  res.json({ msg: "Deleted" });
});
