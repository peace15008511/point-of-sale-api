import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { createProduct } from "../services/product.services";

const server = fastify({ logger: true });

// Define an interface for the request body
interface reqeustBodyInt {
  name: string;
  description: string;
  price: string;
  quantity: number;
}

// Define an interface for the response
type responseInt =
  | { message: string; error: string }
  | { message: string; response: boolean };

//Default error response
let errorResponse: responseInt = {
  message: "Internal Server Error",
  error: "An unexpected error occurred on the server",
};

//success response
const successResponse: responseInt = {
  message: "success",
  response: true,
};

export async function createProductController(
  request: FastifyRequest<{ Body: reqeustBodyInt }>,
  reply: FastifyReply
) {
  try {
    const { name, description, price, quantity } = request.body;
    const newProduct = await createProduct(name, description, price, quantity); // Create a new product
    server.log.info(
      "create.product.controller.ts: create new product reeesponse:" +
        JSON.stringify(newProduct)
    );
    if (!newProduct) {
      reply.code(500).send(errorResponse);
    } else {
      reply.code(201).send(successResponse);
    }
  } catch (error: any) {
    reply.code(500).send(errorResponse);
  }
}
