const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");
const Food = require("../models/Food");

// CREATE
router.post("/", foodController.createFood);

// GET food by name → HARUS PALING ATAS
router.get("/name/:name", async (req, res) => {
    console.log("HIT ROUTE /name =>", req.params.name); // DEBUG
  try {
    const food = await Food.findOne({
      where: { name: req.params.name }
    });

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

module.exports = router;
