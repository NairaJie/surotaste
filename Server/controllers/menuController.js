import Menu from "../models/menu.js";
import Restaurant from "../models/restaurant.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.create(req.body);
  res.status(201).json(menu);
});

export const getAllMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.findAll({
    include: { model: Restaurant, as: "restaurant" },
  });
  res.json(menus);
});

export const getMenuById = asyncHandler(async (req, res) => {
  const menu = await Menu.findByPk(req.params.id, {
    include: { model: Restaurant, as: "restaurant" }
  });

  if (!menu) return res.status(404).json({ msg: "Menu not found" });
  res.json(menu);
});

export const updateMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findByPk(req.params.id);
  if (!menu) return res.status(404).json({ msg: "Menu not found" });

  await menu.update(req.body);
  res.json(menu);
});

export const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findByPk(req.params.id);
  if (!menu) return res.status(404).json({ msg: "Menu not found" });

  await menu.destroy();
  res.json({ msg: "Deleted" });
});
