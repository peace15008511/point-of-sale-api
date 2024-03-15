import { FastifyInstance } from "fastify";
import { createProductController } from "../controllers/create.product.controller";
import { getProductsController } from "../controllers/get.products.controller";
import { updateProductController } from "../controllers/update.product.controller";
import { deleteProductController } from "../controllers/delete.product.controller";

// Define all routes related routes
export async function createProductRoute(fastify: FastifyInstance) {
  fastify.post("/products", createProductController);
}

export async function getProductsRoute(fastify: FastifyInstance) {
  fastify.get("/products", getProductsController);
}

export async function updateProductRoute(fastify: FastifyInstance) {
  fastify.put("/products/:id", updateProductController);
}

export async function deleteProductRoute(fastify: FastifyInstance) {
  fastify.delete("/products/:id", deleteProductController);
}
