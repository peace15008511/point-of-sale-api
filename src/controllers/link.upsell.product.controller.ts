import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { linkUpsellProduct } from "../services/upsell.product.services";

const server = fastify({ logger: true });

interface linkUpsellReqBody {
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
  request: FastifyRequest<{ Body: linkUpsellReqBody }>,
  reply: FastifyReply
) {
  //Default error response
  let errorResponse: ErrorResponse = {
    message: "Internal Server Error",
    error: "An unexpected error occurred on the server",
  };

  try {
    const { productId, upsellProductId } = request.body;
    const linkUpsell = await linkUpsellProduct(productId, upsellProductId);

    server.log.info(
      "link.upsell.product.controller.ts: products response =>" +
        JSON.stringify(linkUpsell)
    );

    //success response
    let successResponse: SuccessResponse = {
      message: "Request received",
      response: true,
    };
    reply.code(200).send(successResponse);
  } catch (error: any) {
    reply.code(500).send(errorResponse);
  }
}
