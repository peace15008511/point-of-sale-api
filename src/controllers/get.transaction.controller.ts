import { FastifyRequest, FastifyReply } from "fastify";
import { getTransactionById } from "../services/transaction.services";
import { verifyToken } from "../middlewares/authMiddleware";

// Define interfaces
interface ErrorResponseBody {
  message: string;
  error: string;
}

export async function getTransactionController(
  request: FastifyRequest<{ Params: { transactionId: number } }>,
  reply: FastifyReply
) {
  try {
    // Call the verifyToken middleware
    await verifyToken(request, reply);

    const { transactionId } = request.params;

    // Retrieve transaction by ID
    const transaction = await getTransactionById(transactionId);

    if (!transaction) {
      // If transaction not found, send error response
      const errorResponse: ErrorResponseBody = {
        message: "Transaction not found",
        error: `Transaction with ID ${transactionId} not found`,
      };
      reply.code(404).send(errorResponse);
    } else {
      // If transaction found, send success response
      reply.code(200).send(transaction);
    }
  } catch (error: any) {
    // Log error and send error response
    reply.log.error("Error retrieving transaction:", error);
    const errorResponse: ErrorResponseBody = {
      message: "Internal Server Error",
      error: "An unexpected error occurred on the server",
    };
    reply.code(500).send(errorResponse);
  }
}
