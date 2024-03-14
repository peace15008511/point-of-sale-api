import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { getProducts } from "../services/product.service";

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

export async function getProductsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  //Default error response
  let errorResponse: ErrorResponse = {
    message: "Internal Server Error",
    error: "An unexpected error occurred on the server",
  };

  try {
    //Get all products
    const products = await getProducts();

    server.log.info(
      "get.product.controller.ts: products response =>" +
        JSON.stringify(products)
    );

    if (!products) {
      reply.code(500).send(errorResponse);
    } else {
      //success response
      let successResponse: SuccessResponse = {
        message: "success",
        response: products,
      };
      reply.code(200).send(successResponse);
    }
  } catch (error: any) {
    reply.code(500).send(errorResponse);
  }
}
