import express from "express";
import foodController from "../controllers/foodController.js";

const router = express.Router();

// CREATE
router.post("/", foodController.createFood);

// GET food by name (TETAP ADA)
router.get("/name/:name", foodController.getFoodByName);

// READ
router.get("/", foodController.getFoods);
router.get("/:id", foodController.getFoodById);

// UPDATE
router.put("/:id", foodController.updateFood);

// DELETE
router.delete("/:id", foodController.deleteFood);

export default router;
