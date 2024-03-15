import { FastifyInstance } from "fastify";

import { linkUpsellProductController } from "../controllers/link.upsell.product.controller";
import { unlinkUpsellProductController } from "../controllers/unlink.upsell.product.controller";
import { getUpsellProductsController } from "../controllers/get.upsell.products.controller";

// Define all routes related routes
export async function linkUpsellProductRoute(fastify: FastifyInstance) {
  fastify.post("/products/upsell", linkUpsellProductController);
}

export async function unlinkUpsellProductRoute(fastify: FastifyInstance) {
  fastify.delete("/products/upsell", unlinkUpsellProductController);
}

export async function getRelatedUpsellProductsRoute(fastify: FastifyInstance) {
  fastify.get("/products/upsell/:productId", getUpsellProductsController);
}
