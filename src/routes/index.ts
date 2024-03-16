import { FastifyInstance } from "fastify";

import { createUserRoute, authUserRoute } from "./user.routes";

import {
  createProductRoute,
  getProductsRoute,
  updateProductRoute,
  deleteProductRoute,
} from "./product.routes";

import {
  linkUpsellProductRoute,
  unlinkUpsellProductRoute,
  getRelatedUpsellProductsRoute,
} from "./upsell.product.routes";

import {
  createProductsTransactionRoute,
  getTransactionRoute,
} from "./transaction.routes";

export async function routes(fastify: FastifyInstance) {
  // List all the routes in use here
  fastify.register(createUserRoute);
  fastify.register(authUserRoute);
  fastify.register(createProductRoute);
  fastify.register(getProductsRoute);
  fastify.register(updateProductRoute);
  fastify.register(deleteProductRoute);
  fastify.register(linkUpsellProductRoute);
  fastify.register(unlinkUpsellProductRoute);
  fastify.register(getRelatedUpsellProductsRoute);
  fastify.register(createProductsTransactionRoute);
  fastify.register(getTransactionRoute);
}
