import { FastifyInstance } from "fastify";

import createUserRoute from "./user.route";

export default async function routes(fastify: FastifyInstance) {
  // List all the routes in use here
  fastify.register(createUserRoute);
}
