import db from "../config/db.js";

export const getAllCulinary = async () => {
  const [rows] = await db.query(`
    SELECT 
      c.*,
      f.name AS food_name,
      f.category AS food_category,
      r.id AS restaurant_id,
      r.name AS restaurant_name,
      r.image AS restaurant_image
    FROM culinaries c
    JOIN food f ON c.foodId = f.id
    JOIN restaurants r ON c.restaurantId = r.id
  `);

  return rows;
};

export const getCulinaryById = async (id) => {
  const [rows] = await db.query(`
    SELECT 
      c.*,
      f.name AS food_name,
      r.id AS restaurant_id,
      r.name AS restaurant_name,
      r.image AS restaurant_image
    FROM culinaries c
    JOIN food f ON c.foodId = f.id
    JOIN restaurants r ON c.restaurantId = r.id
    WHERE c.id = ?
  `, [id]);

  return rows[0];
};

export const getByFoodId = async (foodId) => {
  const [rows] = await db.query(`
    SELECT c.*, r.name AS restaurant_name
    FROM culinaries c
    JOIN restaurants r ON c.restaurantId = r.id
    WHERE c.foodId = ?
  `, [foodId]);

  return rows;
};

export const getCulinaryByRestaurant = async (restaurantId) => {
  const [rows] = await db.query(`
    SELECT c.*
    FROM culinaries c
    WHERE c.restaurantId = ?
  `, [restaurantId]);

  return rows;
};

export const createCulinary = async (data) => {
  const [result] = await db.query(
    `INSERT INTO culinaries SET ?`,
    [data]
  );
  return result.insertId;
};

export const updateCulinary = async (id, data) => {
  await db.query(`UPDATE culinaries SET ? WHERE id = ?`, [data, id]);
};

export const deleteCulinary = async (id) => {
  await db.query(`DELETE FROM culinaries WHERE id = ?`, [id]);
};
