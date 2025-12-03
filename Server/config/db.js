import { Sequelize } from "sequelize";

const sequelize = new Sequelize("surotaste", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("Database connected");
} catch (err) {
  console.log("DB error:", err);
}

export default sequelize;
