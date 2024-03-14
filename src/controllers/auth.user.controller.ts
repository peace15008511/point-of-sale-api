import { fastify, FastifyRequest, FastifyReply } from "fastify";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { getUser } from "../services/user.service";

const server = fastify({ logger: true });

// Define an interface for the request body
interface reqeustBodyInt {
  email: string;
  password: string;
}

// Define an interface for the response
type responseInt =
  | { message: string; error: string }
  | { message: string; response: string };

//Error response
let errorResponse: responseInt = {
  message: "Unauthorized",
  error: "Authentication credentials are missing or invalid",
};

export async function authUserController(
  request: FastifyRequest<{ Body: reqeustBodyInt }>,
  reply: FastifyReply
) {
  try {
    //Body params
    const { email, password } = request.body;

    const existingUser = await getUser(email);

    server.log.info(
      "auth.controller.ts: Existing user response =>" +
        JSON.stringify(existingUser)
    );

    if (!existingUser) {
      reply.status(401).send(errorResponse);
    } else {
      const isPasswordValid: boolean = await bcrypt.compare(
        password, //plain password
        existingUser.password //hashed password
      );
      if (existingUser.email == email && isPasswordValid) {
        const JWT_SECRET: string = "MUNCH";
        const token = jwt.sign({ userId: email }, JWT_SECRET, {
          expiresIn: "1h",
        });
        // response
        let successResponse: responseInt = {
          message: "success",
          response: token,
        };
        reply.status(200).send(successResponse);
      } else {
        reply.status(401).send(errorResponse);
      }
    }
  } catch (error: any) {
    errorResponse = {
      message: "Internal Server Error",
      error: "An unexpected error occurred on the server",
    };
    reply.code(500).send(errorResponse);
  }
}
