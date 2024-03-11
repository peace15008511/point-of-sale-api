import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "../services/user.service";

// Define an interface for the request body
interface CreateUserRequest {
  username: string;
  email: string;
}

async function createUserController(
  request: FastifyRequest<{ Body: CreateUserRequest }>,
  reply: FastifyReply
) {
  try {
    const { username, email } = request.body;

    // Create the user using the service function
    const newUser = await createUser(username, email);

    return reply.code(201).send(newUser);
  } catch (error: any) {
    // Specify the type of 'error'
    console.error("Error creating user:", error);
    return reply.code(500).send({ error: error.message });
  }
}

export { createUserController };
