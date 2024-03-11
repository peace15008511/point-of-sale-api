import fastify from "fastify";
import routes from "./routes";

const server = fastify({ logger: true });

server.register(routes);

const start = async () => {
  try {
    //Read port from environment variable => default is '3000'
    const port: number = 8080; //Number(process.env.PORT) ?? 3000;
    await server.listen({ port: port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
