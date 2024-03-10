import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { serviceGetUsers } from "../services/userService";

const server = fastify({ logger: true });

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await serviceGetUsers(); // Call the service function to get users
    return users; // Return the fetched users
  } catch (error) {
    // Handle errors
    server.log.error("Error fetching users:", error);
    reply.code(500).send({ message: "Internal Server Error" });
  }
}
