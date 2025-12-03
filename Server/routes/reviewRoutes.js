// routes/reviewRoutes.js
import express from "express";
import { createReview, getAllReviews, getReviewsByRestaurant } from "../controllers/reviewController.js";
import validateReview from "../middleware/validateReview.js";

const router = express.Router();

router.post("/", validateReview, createReview);
router.get("/", getAllReviews);
router.get("/restaurant/:id", getReviewsByRestaurant);

export default router;
