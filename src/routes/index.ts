import { FastifyInstance } from "fastify";

import { createUserRoute, authUserRoute } from "./user.route";
import {
  createProductRoute,
  getProductsRoute,
  updateProductRoute,
  deleteProductRoute,
} from "./products.route";

export async function routes(fastify: FastifyInstance) {
  // List all the routes in use here
  fastify.register(createUserRoute);
  fastify.register(authUserRoute);
  fastify.register(createProductRoute);
  fastify.register(getProductsRoute);
  fastify.register(updateProductRoute);
  fastify.register(deleteProductRoute);
}
