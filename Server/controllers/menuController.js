import Menu from "../models/menu.js";
import Restaurant from "../models/restaurant.js";
import asyncHandler from "../middleware/asyncHandler.js";

// CREATE
export const createMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.create(req.body);
  res.status(201).json(menu);
});

// GET ALL
export const getAllMenus = asyncHandler(async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const menus = await Menu.findAll({
    include: { model: Restaurant, as: "restaurant" },
  });

  const formatted = menus.map(m => ({
    ...m.dataValues,
    image: m.image ? `${baseUrl}/${m.image}` : null,
  }));

  res.json(formatted);
});

// GET BY ID
export const getMenuById = asyncHandler(async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const menu = await Menu.findByPk(req.params.id, {
    include: { model: Restaurant, as: "restaurant" },
  });

  if (!menu) return res.status(404).json({ msg: "Menu not found" });

  res.json({
    ...menu.dataValues,
    image: menu.image ? `${baseUrl}/${menu.image}` : null,
  });
});

// UPDATE
export const updateMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findByPk(req.params.id);
  if (!menu) return res.status(404).json({ msg: "Menu not found" });

  await menu.update(req.body);
  res.json(menu);
});

// DELETE
export const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findByPk(req.params.id);
  if (!menu) return res.status(404).json({ msg: "Menu not found" });

  await menu.destroy();
  res.json({ msg: "Deleted" });
});

// ⭐ GET MENUS BY RESTAURANT ID
export const getMenusByRestaurantId = asyncHandler(async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const menus = await Menu.findAll({
    where: { restaurantId: req.params.id },
  });

  const formatted = menus.map(m => ({
    ...m.dataValues,
    image: m.image ? `${baseUrl}/${m.image}` : null,
  }));

  res.json(formatted);
});
