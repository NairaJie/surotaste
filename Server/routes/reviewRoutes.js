const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const validateReview = require("../middleware/validateReview");

router.post("/", validateReview, reviewController.createReview);
router.get("/", reviewController.getAllReviews);
router.get("/restaurant/:id", reviewController.getReviewsByRestaurant);

module.exports = router;
