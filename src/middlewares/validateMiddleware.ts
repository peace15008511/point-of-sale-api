import { FastifyRequest, FastifyReply } from "fastify";
import Ajv, { ValidateFunction } from "ajv";

//import all schemas
import { createProductSchema } from "../schemas/create.product.schema";

export const validateData = async (
  req: FastifyRequest,
  reply: FastifyReply,
  schemaName: string,
  validationType: string
) => {
  try {
    // Initialize Ajv
    const ajv = new Ajv();

    // load schema
    loadValidationSchema(schemaName);

    // Create a compiled validator function
    const validate: ValidateFunction = ajv.compile(createProductSchema);

    let isValid: boolean = false;

    // Validate request parameters
    if (validationType == "body") {
      isValid = validate(req.body);
    } /*else if (validationType == "params") {
      isValid = validate(req.params);
    }*/ else {
    }

    if (!isValid) {
      // If validation fails, send a 400 Bad Request response
      reply.code(400).send({
        error: "Invalid parameters",
        details: validate.errors,
      });
    }
  } catch (error) {
    // Handle other errors
    reply.code(500).send({ error: "Internal Server Error" });
  }
};

// schema function to load schemas depending on route
function loadValidationSchema(schemaName: string) {
  try {
    let schema: any = undefined;
    if (schemaName == "createProductSchema") {
      schema = createProductSchema;
    }

    return schema;
  } catch (Error: any) {
    console.log("validateMiddleware.ts:", Error);
  }
}
