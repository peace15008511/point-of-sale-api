import { fastify, FastifyRequest, FastifyReply } from "fastify";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const server = fastify({ logger: true });

// Load environment variables from .env file
dotenv.config();

// Middleware to verify token
export const verifyToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token = request.headers["authorization"]; //extract token from the request header

    if (!token) {
      reply.code(401).send({
        message: "Unauthorized",
        error: "Unauthorized: Token not provided",
      });
      return;
    }
    const secret: string = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, secret);
    server.log.error("authMiddleware.ts: USER Authorized");
    return decoded; // Return decoded data e.g.,  {"userId":"user@mail.com","iat":1710690419,"exp":1710694019}
  } catch (error: any) {
    server.log.error("authMiddleware.ts: Unauthorized: Invalid token");
    reply.code(401).send({ message: "Unauthorized: Invalid token" });
  }
};
