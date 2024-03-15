import { FastifyInstance } from "fastify";

import { linkUpsellProductController } from "../controllers/link.upsell.product.controller";
import { unlinkUpsellProductController } from "../controllers/unlink.upsell.product.controller";
import { getUpsellProductsController } from "../controllers/get.upsell.products";
import { getProductsWithUpsellController } from "../controllers/get.products.with.upsell";

// Define all routes related routes
export async function linkUpsellProductRoute(fastify: FastifyInstance) {
  fastify.post("/products/upsell", linkUpsellProductController);
}

export async function unlinkUpsellProductRoute(fastify: FastifyInstance) {
  fastify.delete("/products/upsell", unlinkUpsellProductController);
}

export async function getUpsellProductsRoute(fastify: FastifyInstance) {
  fastify.get("/products/upsell", getUpsellProductsController);
}

export async function getProductsWithUpsell(fastify: FastifyInstance) {
  fastify.get("/products/linked/upsell", getProductsWithUpsellController);
}
