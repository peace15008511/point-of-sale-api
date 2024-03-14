import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { deleteProduct } from "../services/product.service";

const server = fastify({ logger: true });

interface reqeustParamsInt {
  id: number;
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

export async function deleteProductController(
  request: FastifyRequest<{ Params: reqeustParamsInt }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    const delProduct = await deleteProduct(id); // Delete product
    server.log.info(
      "delete.product.controller.ts: delete product response:" +
        JSON.stringify(delProduct)
    );
    reply.code(204);
  } catch (error: any) {
    reply.code(500).send(errorResponse);
  }
}
