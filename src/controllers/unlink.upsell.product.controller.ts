import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { unlinkUpsellProduct } from "../services/upsell.product.services";

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

export async function unlinkUpsellProductController(
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
    const unlinkUpsell = await unlinkUpsellProduct(productId, upsellProductId);

    server.log.info(
      "inlink.upsell.product.controller.ts: products response =>" +
        JSON.stringify(unlinkUpsell)
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
