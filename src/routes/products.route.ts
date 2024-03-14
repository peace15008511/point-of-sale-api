import { FastifyInstance } from "fastify";
import { createProductController } from "../controllers/create.product.controller";
import { getProductsController } from "../controllers/get.product.controller";
import { updateProductController } from "../controllers/update.product.controller";
import { deleteProductController } from "../controllers/delete.product.controller";

// Define all routes related routes
export async function createProductRoute(fastify: FastifyInstance) {
  fastify.post("/product", createProductController);
}

export async function getProductsRoute(fastify: FastifyInstance) {
  fastify.get("/product", getProductsController);
}

export async function updateProductRoute(fastify: FastifyInstance) {
  fastify.put("/product", updateProductController);
}

export async function deleteProductRoute(fastify: FastifyInstance) {
  fastify.delete("/product", deleteProductController);
}
