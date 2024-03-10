import { FastifyInstance } from "fastify";
//import exampleRoute from "./exampleRoute";
import taskRoutes from "./taskRoutes";
import userRouts from "./userRoutes";

export default async function routes(fastify: FastifyInstance) {
  // List all the routes in use here
  fastify.register(taskRoutes);
  fastify.register(userRouts);
  //fastify.register(exampleRoute);
}
