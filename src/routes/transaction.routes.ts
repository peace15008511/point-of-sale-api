import { FastifyInstance } from "fastify";

import { createProductsTransactionController } from "../controllers/create.transaction.controller";
import { getTransactionController } from "../controllers/get.transaction.controller";

// DEFINE ALL RELATED ROUTES
export async function createProductsTransactionRoute(fastify: FastifyInstance) {
  fastify.post("/transactions", createProductsTransactionController);
}

export async function getTransactionRoute(fastify: FastifyInstance) {
  fastify.get("/transactions/:transactionId", getTransactionController);
}
