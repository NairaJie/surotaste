import {
  getReviewsByRestaurant,
  getAllReviews,
  createReview,
} from "../repositories/reviewRepo.js";

const getByRestaurant = async (req, res) => {
  const reviews = await getReviewsByRestaurant(req.params.id);
  res.json(reviews);
};

const getAll = async (req, res) => {
  const reviews = await getAllReviews();
  res.json(reviews);
};

const create = async (req, res) => {
  await createReview(req.body);
  res.status(201).json({ success: true });
};

export default {
  getByRestaurant,
  getAll,
  create,
};
