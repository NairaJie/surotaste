const Review = require("../models/Review");
const asyncHandler = require("../middleware/asyncHandler");

module.exports = {
    createReview: asyncHandler(async (req, res) => {
        const { rating, description, userId, restaurantId } = req.body;

        const review = await Review.create({
            rating,
            description,
            userId,
            restaurantId
        });

        res.status(201).json(review);
    }),

    getAllReviews: asyncHandler(async (req, res) => {
        const reviews = await Review.findAll({
            include: [
                { association: "reviewUser", attributes: ["id", "name", "photoURL"] },
                { association: "restaurantReview" }
            ]
        });

        res.json(reviews);
    }),

    getReviewsByRestaurant: asyncHandler(async (req, res) => {
        const reviews = await Review.findAll({
            where: { restaurantId: req.params.id },
            include: [
                { association: "reviewUser", attributes: ["id", "name", "photoURL"] },
                { association: "restaurantReview" }
            ]
        });

        res.json(reviews);
    })
};
