import { FastifyRequest, FastifyReply } from "fastify";
import { linkUpsellProduct } from "../services/upsell.product.services";
import { verifyToken } from "../middlewares/authMiddleware";

// Define interfaces
interface LinkUpsellReqBody {
  productId: number;
  upsellProductId: number;
}

interface SuccessResponse {
  message: string;
  response: boolean;
}

interface ErrorResponse {
  message: string;
  error: string;
}

export async function linkUpsellProductController(
  request: FastifyRequest<{ Body: LinkUpsellReqBody }>,
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

    const { productId, upsellProductId } = request.body;
    const linkUpsell = await linkUpsellProduct(productId, upsellProductId);

    // Log the response
    reply.log.info(
      "linkUpsellProductController: products response =>" +
        JSON.stringify(linkUpsell)
    );

    // Success response
    const successResponse: SuccessResponse = {
      message: "Success",
      response: true,
    };
    reply.code(200).send(successResponse);
  } catch (error: any) {
    // Log the error and send error response
    reply.log.error("Error linking upsell product:", error);
    reply.code(500).send(errorResponse);
  }
}
