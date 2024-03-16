import { FastifyInstance } from "fastify";

import { createProductsTransactionController } from "../controllers/create.purchase.transaction.controller";

// DEFINE ALL RELATED ROUTES
export async function createProductsTransactionRoute(fastify: FastifyInstance) {
  fastify.post("/transactions", createProductsTransactionController);
}
