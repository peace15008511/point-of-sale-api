import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { createProduct } from "../services/product.services";
import { verifyToken } from "../middlewares/authMiddleware";

const server = fastify({ logger: true });

// Define interfaces
interface RequestBody {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface ResponseBody {
  message: string;
  response?: boolean;
  error?: string;
}

// Default error response
const errorResponse: ResponseBody = {
  message: "Internal Server Error",
  error: "An unexpected error occurred while processing the request",
};

// Success response
const successResponse: ResponseBody = {
  message: "Success",
  response: true,
};

// Controller function to create a product
export async function createProductController(
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply
) {
  try {
    // Call the verifyToken middleware
    await verifyToken(request, reply);

    // Extract request body parameters
    const { name, description, price, quantity } = request.body;

    // Call service function to create product
    const newProduct = await createProduct(name, description, price, quantity);

    // Log response
    server.log.info(
      "create.product.controller.ts: Created new product: " +
        JSON.stringify(newProduct)
    );

    // Check if product creation was successful
    if (!newProduct) {
      // Send error response if product creation failed
      reply.code(500).send(errorResponse);
      return;
    } else {
      // Send success response if product creation was successful
      reply.code(201).send(successResponse);
      return;
    }
  } catch (error: any) {
    // Log error
    server.log.error("Error occurred while creating product:", error);
    // Send error response
    reply.code(500).send(errorResponse);
  }
}
