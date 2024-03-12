import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user.controller";
import { authUserController } from "../controllers/auth.controller";

// Define all routes related routes
export async function createUserRoute(fastify: FastifyInstance) {
  fastify.post("/users", createUserController);
}

export async function authUserRoute(fastify: FastifyInstance) {
  fastify.post("/login", authUserController);
}
