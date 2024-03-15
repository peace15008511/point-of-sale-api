import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { updateProduct } from "../services/product.services";

const server = fastify({ logger: true });

// Define an interface for the request body
interface reqeustBodyInt {
  name: any;
  description: any;
  price: any;
  quantity: any;
}

interface SuccessResponse {
  message: string;
  response: boolean;
}

interface ErrorResponse {
  message: string;
  error: string;
}

//Default error response
let errorResponse: ErrorResponse = {
  message: "Internal Server Error",
  error: "An unexpected error occurred on the server",
};

export async function updateProductController(
  request: FastifyRequest<{ Params: { id: number }; Body: reqeustBodyInt }>,
  reply: FastifyReply
) {
  //Default error response
  let errorResponse: ErrorResponse = {
    message: "Internal Server Error",
    error: "An unexpected error occurred on the server",
  };

  try {
    const { name, description, price, quantity } = request.body;
    const { id } = request.params;

    const data: reqeustBodyInt = {
      name: name ? name : null,
      description: description ? description : null,
      price: price ? price : null,
      quantity: quantity ? quantity : null,
    };

    server.log.info(
      "update.product.controller.ts: update product data is:" +
        JSON.stringify(data)
    );

    const newProduct = await updateProduct(id, data); // Create a new product
    server.log.info(
      "update.product.controller.ts: update product response:" +
        JSON.stringify(newProduct)
    );
    if (!newProduct) {
      reply.code(500).send(errorResponse);
    } else {
      reply.code(200).send(newProduct);
    }
  } catch (error: any) {
    reply.code(500).send(errorResponse);
  }
}
