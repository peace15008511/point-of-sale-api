import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { deleteProduct } from "../services/product.services";
import { verifyToken } from "../middlewares/authMiddleware";

const server = fastify({ logger: true });

interface ReqeustParams {
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

// Success response
const successResponse: SuccessResponse = {
  message: "Success",
  response: true,
};

export async function deleteProductController(
  request: FastifyRequest<{ Params: ReqeustParams }>,
  reply: FastifyReply
) {
  try {
    // Call the verifyToken middleware
    await verifyToken(request, reply);
    const { id } = request.params;

    const delProduct = await deleteProduct(id); // Delete product
    server.log.info(
      "delete.product.controller.ts: delete product response:" +
        JSON.stringify(delProduct)
    );
    reply.code(200).send(successResponse);
  } catch (error: any) {
    console.log("Error", error);
    reply.code(500).send({ error: "yoooh" });
  }
}
