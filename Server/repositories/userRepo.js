import db from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, name, email, image, role, provider FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const createLocalUser = async ({ name, email, password }) => {
  const [result] = await db.query(
    `INSERT INTO users (name, email, password, provider, role)
     VALUES (?, ?, ?, 'local', 'user')`,
    [name, email, password]
  );

  return result.insertId;
};

export const findOrCreateGoogleUser = async (profile) => {
  const googleId = profile.id;
  const email = profile.emails?.[0]?.value;

  const [existing] = await db.query(
    "SELECT * FROM users WHERE googleId = ? LIMIT 1",
    [googleId]
  );

  if (existing.length) return existing[0];

  const [result] = await db.query(
    `INSERT INTO users
     (name, email, googleId, image, provider, role)
     VALUES (?, ?, ?, ?, 'google', 'user')`,
    [
      profile.displayName,
      email,
      googleId,
      profile.photos?.[0]?.value ?? "/profile.png",
    ]
  );

  const [rows] = await db.query(
    "SELECT * FROM users WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
};
