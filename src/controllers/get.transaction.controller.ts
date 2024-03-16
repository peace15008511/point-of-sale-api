import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { getTransactionById } from "../services/transaction.services";

const server = fastify({ logger: true });

interface ErrorResponse {
  message: string;
  error: string;
}

export async function getTransactionController(
  request: FastifyRequest<{ Params: { transactionId: number } }>,
  reply: FastifyReply
) {
  //Default error response
  let errorResponse: ErrorResponse = {
    message: "Internal Server Error",
    error: "An unexpected error occurred on the server",
  };

  try {
    const { transactionId } = request.params;

    //ADD A PURCHASE TRANSACTION
    const getTransaction = await getTransactionById(transactionId);

    server.log.info(
      "get.transaction.controller.ts: Transaction is:" +
        JSON.stringify(getTransaction)
    );
    if (getTransaction != null) {
      reply.code(500).send(errorResponse);
    } else {
      reply.code(200).send(getTransaction);
    }
  } catch (error: any) {
    reply.code(500).send(errorResponse);
  }
}
