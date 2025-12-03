// controllers/menuController.js
const Menu = require("../models/Menu");
const Restaurant = require("../models/Restaurant");

module.exports = {
  // CREATE
  createMenu: async (req, res) => {
    try {
      const newMenu = await Menu.create(req.body);
      res.status(201).json(newMenu);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // READ ALL
  getAllMenus: async (req, res) => {
    try {
      const menus = await Menu.findAll({
        include: { model: Restaurant, as: "restaurant" },
      });
      res.json(menus);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // READ BY ID
  getMenuById: async (req, res) => {
    try {
      const menu = await Menu.findByPk(req.params.id, {
        include: { model: Restaurant, as: "restaurant" },
      });
      if (!menu) return res.status(404).json({ msg: "Menu not found" });
      res.json(menu);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // UPDATE
  updateMenu: async (req, res) => {
    try {
      const menu = await Menu.findByPk(req.params.id);
      if (!menu) return res.status(404).json({ msg: "Menu not found" });

      await menu.update(req.body);
      res.json(menu);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE
  deleteMenu: async (req, res) => {
    try {
      const menu = await Menu.findByPk(req.params.id);
      if (!menu) return res.status(404).json({ msg: "Menu not found" });

      await menu.destroy();
      res.json({ msg: "Menu deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
