const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

// CREATE
router.post("/", foodController.createFood);

// READ
router.get("/", foodController.getFoods);
router.get("/:id", foodController.getFoodById);

// UPDATE
router.put("/:id", foodController.updateFood);

// DELETE
router.delete("/:id", foodController.deleteFood);

module.exports = router;
