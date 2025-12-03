import Review from "../models/review.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
});

export const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.findAll({
    include: [
      { association: "reviewUser", attributes: ["id", "name", "photoURL"] },
      { association: "restaurantReview" }
    ]
  });

  res.json(reviews);
});

export const getReviewsByRestaurant = asyncHandler(async (req, res) => {
  const reviews = await Review.findAll({
    where: { restaurantId: req.params.id },
    include: [
      { association: "reviewUser", attributes: ["id", "name", "photoURL"] },
      { association: "restaurantReview" }
    ]
  });

  res.json(reviews);
});
