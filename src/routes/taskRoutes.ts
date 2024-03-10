import { FastifyInstance } from "fastify";
import { getAllTasks } from "../controllers/taskController";

export default async function taskRoutes(fastify: FastifyInstance) {
  fastify.get("/tasks", async (request, reply) => {
    return getAllTasks(request, reply);
  });
}
