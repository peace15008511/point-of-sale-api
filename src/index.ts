import fastify from "fastify";
import routes from "./routes";

const server = fastify({ logger: true });

server.register(routes);

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    //server.log.info(`Server is running on ${server.server.address().port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
