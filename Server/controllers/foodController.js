const Food = require("../models/Food");

module.exports = {
  // CREATE FOOD
  createFood: async (req, res) => {
    try {
      const { name, history, description, meals, category, image } = req.body;

      const newFood = await Food.create({
        name,
        history,
        description,
        meals,
        category,
        image,
      });

      return res.status(201).json({
        message: "Food created successfully",
        data: newFood,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET ALL FOOD
  getFoods: async (req, res) => {
    try {
      const foods = await Food.findAll();
      return res.status(200).json(foods);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET FOOD BY ID
  getFoodById: async (req, res) => {
    try {
      const { id } = req.params;

      const food = await Food.findByPk(id);
      if (!food) return res.status(404).json({ message: "Food not found" });

      return res.status(200).json(food);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // UPDATE FOOD
  updateFood: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, history, description, meals, category, image } = req.body;

      const food = await Food.findByPk(id);
      if (!food) return res.status(404).json({ message: "Food not found" });

      await food.update({
        name,
        history,
        description,
        meals,
        category,
        image,
      });

      return res.status(200).json({
        message: "Food updated successfully",
        data: food,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // DELETE FOOD
  deleteFood: async (req, res) => {
    try {
      const { id } = req.params;

      const food = await Food.findByPk(id);
      if (!food) return res.status(404).json({ message: "Food not found" });

      await food.destroy();

      return res.status(200).json({ message: "Food deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
