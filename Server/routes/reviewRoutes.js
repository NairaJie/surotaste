import express from "express";
import reviewController from "../controllers/reviewController.js";
import validateReview from "../middleware/validateReview.js";

const router = express.Router();

router.post("/", validateReview, reviewController.create);
router.get("/", reviewController.getAll);
router.get("/restaurant/:id", reviewController.getByRestaurant);

export default router;
