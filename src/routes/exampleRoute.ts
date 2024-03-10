import { FastifyInstance } from "fastify";

export default async function exampleRoute(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return { message: "This is an example route" };
  });
}
