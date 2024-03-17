import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { createTransactionWithProducts } from "../services/transaction.services";
import { verifyToken } from "../middlewares/authMiddleware";

const server = fastify({ logger: true });

/******************* BUILDING UP REQUEST BODY INTERFACE *******************/
interface UpsellProductInt {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface MainProductInt {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  upsellProducts: UpsellProductInt[];
}

// DEFINE REQUEST BODY INTERFACE
interface RequestBody {
  email: string;
  purchasedProducts: MainProductInt[];
}
/******************* END OF BUILDING REQUEST BODY INTERFACE *******************/

// Define an interface for the response
interface ResponseBody {
  message: string;
  response?: boolean;
  error?: string;
}

// Default error response
let errorResponse: ResponseBody = {
  message: "Internal Server Error",
  error: "An unexpected error occurred on the server",
};

// Success response
const successResponse: ResponseBody = {
  message: "success",
  response: true,
};

export async function createProductsTransactionController(
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply
) {
  try {
    // Call the verifyToken middleware
    await verifyToken(request, reply);

    const { email, purchasedProducts } = request.body;

    // Calculate total amount and quantity
    const {
      totalAmount,
      totalQuantity,
      totalMainProductsQauntity,
      totalUpsellProductsQauntity,
    } = calculateTotal(purchasedProducts);

    // ADD A PURCHASE TRANSACTION
    const newProduct = await createTransactionWithProducts(
      email,
      totalAmount,
      totalQuantity,
      totalMainProductsQauntity,
      totalUpsellProductsQauntity,
      purchasedProducts
    );

    server.log.info(
      "create.product.controller.ts: create new product response:" +
        JSON.stringify(newProduct)
    );
    if (!newProduct) {
      reply.code(500).send(errorResponse);
    } else {
      reply.code(201).send(successResponse);
    }
  } catch (error: any) {
    server.log.error("Error creating transaction with products:", error);
    reply.code(500).send(errorResponse);
  }
}

// Function to calculate total amount and quantity
function calculateTotal(products: MainProductInt[]) {
  let totalAmount = 0;
  let totalQuantity = 0;
  let totalMainProductsQauntity = 0;
  let totalUpsellProductsQauntity = 0;

  products.forEach((product) => {
    totalAmount += product.price * product.quantity;
    //totalQuantity += product.quantity;
    totalMainProductsQauntity += product.quantity;

    product.upsellProducts.forEach((upsellProduct) => {
      console.log("UPSELL DETECTED");
      totalAmount += upsellProduct.price * upsellProduct.quantity;
      //totalQuantity += upsellProduct.quantity;
      totalUpsellProductsQauntity += upsellProduct.quantity;
    });
  });
  totalQuantity = totalMainProductsQauntity + totalUpsellProductsQauntity;
  console.log(
    `totalAmount=${totalAmount},totalQuantity=${totalQuantity},totalUpsellProductsQauntity=${totalUpsellProductsQauntity},totalMainProductsQauntity=${totalMainProductsQauntity},`
  );

  return {
    totalAmount,
    totalQuantity,
    totalUpsellProductsQauntity,
    totalMainProductsQauntity,
  };
}
