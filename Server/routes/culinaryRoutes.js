// routes/culinaryRoutes.js
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

router.get("/", getAllCulinary);
router.get("/:id", getCulinaryById);
router.get("/food/:foodId", getByFoodId);
router.post("/", createCulinary);
router.put("/:id", updateCulinary);
router.delete("/:id", deleteCulinary);

export default router;
