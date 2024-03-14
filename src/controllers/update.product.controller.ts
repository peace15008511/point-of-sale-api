import fastify, { FastifyRequest, FastifyReply } from "fastify";
//import { getUser } from "../services/user.service";

//const server = fastify({ logger: true });

// Define an interface for the request body
interface reqeustBodyInt {
  name: string;
  price: string;
  description: string;
  quantity: number;
}

export async function updateProductController(
  request: FastifyRequest<{ Params: reqeustBodyInt }>,
  reply: FastifyReply
) {
  try {
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}
