import { Sequelize } from "sequelize";

const adminSequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  }
);

export default adminSequelize;
