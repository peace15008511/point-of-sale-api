import { FastifyInstance } from "fastify";
import exampleRoute from "./exampleRoute";

export default function routes(
  fastify: FastifyInstance,
  options: any,
  done: () => void
) {
  fastify.register(exampleRoute, { prefix: "/example" });
  // Add more routes here if needed
  done();
}
