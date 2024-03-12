import { FastifyInstance } from "fastify";

import { createUserRoute, authUserRoute } from "./user.route";

export async function routes(fastify: FastifyInstance) {
  // List all the routes in use here
  fastify.register(createUserRoute);
  fastify.register(authUserRoute);
}
