import { FastifyRequest, FastifyReply } from "fastify";

export async function exampleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return { message: "This is an example controller" };
}
