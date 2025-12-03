// routes/menuRoutes.js
import express from "express";
import * as menuController from "../controllers/menuController.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(menuController.createMenu));
router.get("/", asyncHandler(menuController.getAllMenus));
router.get("/:id", asyncHandler(menuController.getMenuById));
router.put("/:id", asyncHandler(menuController.updateMenu));
router.delete("/:id", asyncHandler(menuController.deleteMenu));

export default router;
