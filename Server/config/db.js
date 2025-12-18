import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "127.0.0.1", // 🔥 sama
  user: "root",
  password: "",
  database: "surotaste",
});

export default db;
