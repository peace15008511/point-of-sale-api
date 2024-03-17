import { fastify, FastifyRequest, FastifyReply } from "fastify";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { getUser } from "../services/user.services";

const server = fastify({ logger: true });

// Define interfaces
interface RequestBody {
  email: string;
  password: string;
}

interface ResponseBody {
  message: string;
  response?: string;
  error?: string;
}

// Middleware for handling authentication
export async function authUserController(
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply
) {
  try {
    // Destructure request body
    const { email, password } = request.body;

    // Fetch user from database
    const existingUser = await getUser(email);

    server.log.info(
      "auth.controller.ts: Existing user response =>" +
        JSON.stringify(existingUser)
    );

    // Check if user exists
    if (!existingUser) {
      reply.status(401).send({
        message: "Unauthorized",
        error: "Authentication credentials are missing or invalid",
      });
      return;
    }

    // Validate password
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If email and password are valid, generate JWT token
    if (existingUser.email === email && isPasswordValid) {
      const JWT_SECRET: string = process.env.JWT_SECRET || "no_secret";
      const token = jwt.sign({ userId: email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      // Send success response with token
      reply.status(200).send({ message: "success", response: token });
    } else {
      // Send unauthorized response if credentials are invalid
      reply.status(401).send({
        message: "Unauthorized",
        error: "Authentication credentials are missing or invalid",
      });
    }
  } catch (error: any) {
    // Handle internal server error
    server.log.error("Internal Server Error:", error);
    reply.status(500).send({
      message: "Internal Server Error",
      error: "An unexpected error occurred on the server",
    });
  }
}
