import db from "../config/db.js";

export const getAllRestaurants = async () => {
  const [rows] = await db.query("SELECT * FROM restaurants");
  return rows;
};

export const getRestaurantById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM restaurants WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const getRestaurantByName = async (name) => {
  const [rows] = await db.query(
    "SELECT * FROM restaurants WHERE name = ? LIMIT 1",
    [name]
  );
  return rows[0];
};

export const createRestaurant = async (data) => {
  const {
    name,
    rating,
    openHours,
    description,
    location,
    instagram,
    whatsapp,
    image,
    mapsLink,
    region,
  } = data;

  const [result] = await db.query(
    `INSERT INTO restaurants 
     (name, rating, openHours, description, location, instagram, whatsapp, image, mapsLink, region)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      rating,
      openHours,
      description,
      location,
      instagram,
      whatsapp,
      image,
      mapsLink,
      region,
    ]
  );

  return result.insertId;
};

export const updateRestaurant = async (id, data) => {
  await db.query(
    "UPDATE restaurants SET ? WHERE id = ?",
    [data, id]
  );
};

export const deleteRestaurant = async (id) => {
  await db.query(
    "DELETE FROM restaurants WHERE id = ?",
    [id]
  );
};
