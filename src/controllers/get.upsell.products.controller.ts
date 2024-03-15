import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { getUpsellProductsById } from "../services/upsell.product.services";

const server = fastify({ logger: true });

interface Product {
  name: string;
  description: string;
  price: string;
  quantity: number;
}

interface SuccessResponse {
  message: string;
  response: Product[];
}

interface ErrorResponse {
  message: string;
  error: string;
}

export async function getUpsellProductsController(
  request: FastifyRequest<{ Params: { productId: number } }>,
  reply: FastifyReply
) {
  //Default error response
  let errorResponse: ErrorResponse = {
    message: "Internal Server Error",
    error: "An unexpected error occurred on the server",
  };

  try {
    const { productId } = request.params;
    const UpsellProducts = await getUpsellProductsById(productId);

    server.log.info(
      "inlink.upsell.product.controller.ts: products response =>" +
        JSON.stringify(UpsellProducts)
    );

    //success response
    let successResponse: SuccessResponse = {
      message: "Success",
      response: UpsellProducts,
    };
    reply.code(200).send(successResponse);
  } catch (error: any) {
    reply.code(500).send(errorResponse);
  }
}
