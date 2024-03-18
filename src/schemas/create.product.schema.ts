export const createProductSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    quantity: { type: "number" },
  },
  required: ["name", "description", "price", "quantity"],
  additionalProperties: false, // Disallow additional properties
};
