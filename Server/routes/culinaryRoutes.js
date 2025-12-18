import express from "express";
import culinaryController from "../controllers/culinaryController.js";

const router = express.Router();

// GET ALL
router.get("/", culinaryController.getAll);

// GET by Food ID
router.get("/food/:foodId", culinaryController.getByFood);

// GET by Restaurant ID (route lama, TETEP ADA)
router.get("/restaurant/:id", culinaryController.getByRestaurantId);

// GET by Culinary ID (PALING BAWAH)
router.get("/:id", culinaryController.getById);

// CRUD
router.post("/", culinaryController.create);
router.put("/:id", culinaryController.update);
router.delete("/:id", culinaryController.remove);

export default router;
