import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "FASTIFY_TASK_MANAGER", //process.env.DB_NAME,
  username: "user", //process.env.DB_USERNAME,
  password: "password", //process.env.DB_PASSWORD,
  host: "localhost",
  dialect: "mysql",
});

// Test the connection and synchronize the models
(async () => {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    // Synchronize the models with the database
    await sequelize.sync();
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
