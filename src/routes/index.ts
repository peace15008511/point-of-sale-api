import { FastifyInstance } from "fastify";
import exampleRoute from "./exampleRoute";
import taskRoutes from "./taskRoutes";

export default async function routes(fastify: FastifyInstance) {
  fastify.register(taskRoutes);
  fastify.register(exampleRoute);
  // Add more route handlers here if needed
}
