import { fastify } from "fastify";
import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const server = fastify({ logger: true });

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
});

// Test the connection and create the database if it doesn't exist
(async () => {
  try {
    // Test the connection
    await sequelize.authenticate();
    server.log.info(
      "Connection to the database has been established successfully."
    );

    // Create the database if it doesn't exist
    await sequelize.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    server.log.info(
      `Database ${process.env.DB_NAME} created or already exists.`
    );

    // Sync the models with the database
    await sequelize.sync({ alter: true });
    server.log.info("Models synchronized successfully.");
  } catch (error: any) {
    server.log.error("Unable to connect to the database:", error);
    console.log("Unable to connect to the database:", error);
  }
})();

export default sequelize;
