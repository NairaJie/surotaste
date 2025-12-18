import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import menuController from "../controllers/menuController.js";

const router = express.Router();

router.post("/", asyncHandler(menuController.create));
router.get("/", asyncHandler(menuController.getAll));
router.get("/:id", asyncHandler(menuController.getById));
router.put("/:id", asyncHandler(menuController.update));
router.delete("/:id", asyncHandler(menuController.remove));

export default router;
