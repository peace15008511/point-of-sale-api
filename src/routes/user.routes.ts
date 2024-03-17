import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/create.user.controller";
import { authUserController } from "../controllers/auth.user.controller";

// Define all routes related routes
export async function createUserRoute(fastify: FastifyInstance) {
  fastify.post("/user", createUserController);
}

export async function authUserRoute(fastify: FastifyInstance) {
  fastify.post("/user/login", authUserController);
}
