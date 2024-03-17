import { fastify, FastifyRequest, FastifyReply } from "fastify";
import * as bcrypt from "bcrypt";
import { getUser } from "../services/user.services";
import { createUser } from "../services/user.services";

const server = fastify({ logger: true });

// Define an interface for the request body
interface RequestBody {
  email: string;
  password: string;
}

interface responseBody {
  message: string;
  response?: boolean;
  error?: string;
}

//Default error response
let errorResponse: responseBody = {
  message: "Internal Server Error",
  error: "An unexpected error occurred on the server",
};

//success response
const successResponse: responseBody = {
  message: "Success",
  response: true,
};

export async function createUserController(
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10); //hash the password before it goes to the database
    const existingUser = await getUser(email); //check if the user exist before creating a duplicate user
    server.log.info(
      "create.user.controller: existingUser? Response:" +
        JSON.stringify(existingUser)
    );

    if (!existingUser) {
      // Create the user using the service function
      const newUser = await createUser(email, hashedPassword);
      server.log.info(
        "create.user.controller: create newUser Response:" +
          JSON.stringify(newUser)
      );
      if (!newUser) {
        reply.code(500).send(errorResponse);
      } else {
        reply.code(201).send(successResponse);
      }
    } else {
      errorResponse = {
        message: "User already exists",
        error:
          "The user with the provided email address already exists in the system. Please choose a different email address.",
      };
      reply.code(409).send(errorResponse);
    }
  } catch (error: any) {
    server.log.error("Error creating user:" + JSON.stringify(error));
    reply.code(500).send(errorResponse);
  }
}
