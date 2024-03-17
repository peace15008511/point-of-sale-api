import fastify from "fastify";
import User from "../models/user.model";

const server = fastify({ logger: true });

export async function createUser(email: string, password: string) {
  try {
    // Create the user
    const newUser = await User.create({ email, password });
    server.log.info(
      "user.service.ts: Create User Response:" + JSON.stringify(newUser)
    );
    return newUser;
  } catch (error) {
    server.log.error("user.service.ts: Error creating user:" + error);
    throw new Error("Error creating user on database");
  }
}

export async function getUser(email: string) {
  try {
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ where: { email } });
    server.log.info(
      "user.service.ts: Get User Response:" + JSON.stringify(existingUser)
    );
    return existingUser;
  } catch (error) {
    server.log.error("user.service.ts: Error fetching user:" + error);
    throw new Error("Error fetching user on database");
  }
}
