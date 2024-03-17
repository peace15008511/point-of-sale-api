import * as dotenv from "dotenv";
import fastify from "fastify";
import { routes } from "./routes";

const server = fastify({ logger: true });

// Load environment variables from .env file
dotenv.config();

// Register routes
server.register(routes);

const start = async () => {
  try {
    // Read 'PORT' from environment varible (default 'PORT' is '8080')
    const port: number = Number(process.env.PORT) || 8080;
    await server.listen({ port: port });
  } catch (err: any) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
