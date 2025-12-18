import db from "../config/db.js";

export const getAllFoods = async () => {
  const [rows] = await db.query("SELECT * FROM food");
  return rows;
};

export const createFood = async (data) => {
  const [result] = await db.query(
    `INSERT INTO food
    (name, category, meals, description, history, image)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.category,
      data.meals,
      data.description,
      data.history,
      data.image,
    ]
  );

  return result.insertId;
};

export const getFoodByName = async (name) => {
  const [rows] = await db.query(
    "SELECT * FROM food WHERE name = ?",
    [name]
  );
  return rows[0];
};

export const getFoodById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM food WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const updateFood = async (id, data) => {
  await db.query(
    `UPDATE food
     SET name = ?, category = ?, meals = ?, description = ?, history = ?, image = ?
     WHERE id = ?`,
    [
      data.name,
      data.category,
      data.meals,
      data.description,
      data.history,
      data.image,
      id,
    ]
  );
};

export const deleteFood = async (id) => {
  await db.query("DELETE FROM food WHERE id = ?", [id]);
};
