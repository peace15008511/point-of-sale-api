import fastify from "fastify";
import { UserModel } from "../models/userModel";
import sequelize from "../database/sequelize";

const server = fastify({ logger: true });

export async function serviceGetUsers(): Promise<UserModel[]> {
  // Example logic to fetch data from a database or external service
  const data: UserModel[] = [
    {
      id: 1,
      email: "john@example.com",
      password: "hashed_password_1",
    },
    {
      id: 2,
      email: "jane@example.com",
      password: "hashed_password_2",
    },
    {
      id: 3,
      email: "bob@example.com",
      password: "hashed_password_3",
    },
  ];

  // Check database connection
  sequelize
    .authenticate()
    .then(() => {
      server.log.info("Database connection has been established successfully.");
    })
    .catch((err) => {
      console.error();
      server.log.error("Unable to connect to the database:", err);
    });
  return data;
}
