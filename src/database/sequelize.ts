import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "FASTIFY_TASK_MANAGER", //process.env.DB_NAME,
  username: "user", //process.env.DB_USERNAME,
  password: "password", //process.env.DB_PASSWORD,
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
