import { FastifyRequest, FastifyReply } from "fastify";
import { getProducts } from "../services/product.services";
import { verifyToken } from "../middlewares/authMiddleware";

// Define interfaces
interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface SuccessResponse {
  message: string;
  products: Product[];
}

interface ErrorResponse {
  message: string;
  error: string;
}

export async function getProductsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Call the verifyToken middleware
    await verifyToken(request, reply);

    // Get all products
    const products = await getProducts();

    if (!products) {
      // If no products found, send error response
      const errorResponse: ErrorResponse = {
        message: "No products found",
        error: "No products were found in the database",
      };
      reply.code(404).send(errorResponse);
    } else {
      // If products found, send success response
      const successResponse: SuccessResponse = {
        message: "Success",
        products: products,
      };
      reply.code(200).send(successResponse);
    }
  } catch (error: any) {
    // Log error and send error response
    console.error("Error retrieving products:", error);
    const errorResponse: ErrorResponse = {
      message: "Internal Server Error",
      error: "An unexpected error occurred on the server",
    };
    reply.code(500).send(errorResponse);
  }
}
