import db from "../config/db.js";

export const getReviewsByRestaurant = async (restaurantId) => {
  const [rows] = await db.query(
    `SELECT r.*, u.name AS userName, u.image
     FROM reviews r
     JOIN users u ON r.userId = u.id
     WHERE r.restaurantId = ?`,
    [restaurantId]
  );
  return rows;
};

export const getAllReviews = async () => {
  const [rows] = await db.query(
    `SELECT r.*, u.name AS userName, u.image
     FROM reviews r
     JOIN users u ON r.userId = u.id`
  );
  return rows;
};

export const createReview = async (data) => {
  const { rating, description, userId, restaurantId } = data;

  await db.query(
    `INSERT INTO reviews (rating, description, userId, restaurantId)
     VALUES (?, ?, ?, ?)`,
    [rating, description, userId, restaurantId]
  );
};
