import fastify, { FastifyRequest, FastifyReply } from "fastify";
//import { getUser } from "../services/user.service";

//const server = fastify({ logger: true });

// Define an interface for the request body

interface reqeustParamsInt {
  name: string;
  price: string;
  description: string;
  quantity: number;
}

export async function deleteProductController(
  request: FastifyRequest<{ Params: reqeustParamsInt }>,
  reply: FastifyReply
) {
  try {
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}
