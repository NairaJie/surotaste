import express from "express";
import {
  getAllCulinary,
  getCulinaryById,
  getByFoodId,
  createCulinary,
  updateCulinary,
  deleteCulinary
} from "../controllers/culinaryController.js";

const router = express.Router();

// GET ALL
router.get("/", getAllCulinary);

// GET by Food ID — MUST COME FIRST
router.get("/food/:foodId", getByFoodId);

// GET by Culinary ID
router.get("/:id", getCulinaryById);

// CRUD
router.post("/", createCulinary);
router.put("/:id", updateCulinary);
router.delete("/:id", deleteCulinary);

export default router;
