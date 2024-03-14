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

// Define an interface for the response
/*type responseInt =
  | { message: string; error: string }
  | { message: string; response: string };
*/
export async function getProductsController(
  request: FastifyRequest<{ Body: reqeustBodyInt }>,
  reply: FastifyReply
) {
  try {
  } catch (error: any) {
    reply.code(500).send({ error: error.message });
  }
}
