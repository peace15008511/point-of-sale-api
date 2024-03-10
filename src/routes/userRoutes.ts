import { FastifyInstance } from "fastify";
import { getUsers } from "../controllers/userController";

export default async function taskRoutes(fastify: FastifyInstance) {
  fastify.get("/users", async (request, reply) => {
    return getUsers(request, reply);
  });
}
