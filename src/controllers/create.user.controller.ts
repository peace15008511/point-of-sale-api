import { FastifyRequest, FastifyReply } from "fastify";
import * as bcrypt from "bcrypt";
import { getUser } from "../services/user.services";
import { createUser } from "../services/user.services";

// Define an interface for the request body
interface CreateUserRequest {
  email: string;
  password: string;
}
type responseInt =
  | { message: string; error: string }
  | { message: string; response: boolean };

//Default error response
let errorResponse: responseInt = {
  message: "Internal Server Error",
  error: "An unexpected error occurred on the server",
};

//success response
const successResponse: responseInt = {
  message: "success",
  response: true,
};

export async function createUserController(
  request: FastifyRequest<{ Body: CreateUserRequest }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10); //hash the password before it goes to the database
    const existingUser = await getUser(email); //check if the user exist before creating a duplicate user

    if (!existingUser) {
      // Create the user using the service function
      const newUser = await createUser(email, hashedPassword);
      if (!newUser) {
        reply.code(500).send(errorResponse);
      } else {
        reply.code(201).send(successResponse);
      }
    } else {
      reply.code(500).send(errorResponse);
    }
  } catch (error: any) {
    // Specify the type of 'error'
    console.error("Error creating user:", error);
    reply.code(500).send(errorResponse);
  }
}
