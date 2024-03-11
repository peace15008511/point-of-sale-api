// user.route.ts
import fastify, { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user.controller";

async function createUserRoute(fastify: FastifyInstance) {
  fastify.post("/users", createUserController);
}

export default createUserRoute;
