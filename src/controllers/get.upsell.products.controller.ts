import { FastifyRequest, FastifyReply } from "fastify";
import { getUpsellProductsById } from "../services/upsell.product.services";
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
  // Default error response
  const errorResponse: ErrorResponse = {
    message: "Internal Server Error",
    error: "An unexpected error occurred on the server",
  };

  try {
    // Call the verifyToken middleware
    await verifyToken(request, reply);

    const { productId } = request.params;
    const upsellProducts = await getUpsellProductsById(productId);

    // Log the response
    reply.log.info(
      "getUpsellProductsController: products response =>" +
        JSON.stringify(upsellProducts)
    );

    // Success response
    const successResponse: SuccessResponse = {
      message: "Success",
      response: upsellProducts,
    };
    reply.code(200).send(successResponse);
  } catch (error: any) {
    // Log the error and send error response
    reply.log.error("Error getting upsell products:", error);
    reply.code(500).send(errorResponse);
  }
}
