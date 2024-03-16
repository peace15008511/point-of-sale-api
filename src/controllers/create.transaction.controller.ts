import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { createTransactionWithProducts } from "../services/transaction.services";

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
  ProductUpsells: UpsellProductInt[];
}

// DEFINE REQUEST BODY INTERFACE
interface RequestBodyInt {
  email: string;
  purchasedProducts: MainProductInt[];
}
/******************* END OF BUILDING REQUEST BODY INTERFACE *******************/

/** LIST ALL RESPONSE INTERFACES AND DEFAULT RESPONSES */
// Define an interface for the response
type ResponseInt =
  | { message: string; error: string }
  | { message: string; response: boolean };

// Default error response
let errorResponse: ResponseInt = {
  message: "Internal Server Error",
  error: "An unexpected error occurred on the server",
};

// Success response
const successResponse: ResponseInt = {
  message: "success",
  response: true,
};
/******************* END OF BUILDING REQUEST BODY INTERFACE *******************/

export async function createProductsTransactionController(
  request: FastifyRequest<{ Body: RequestBodyInt }>,
  reply: FastifyReply
) {
  try {
    const { email, purchasedProducts } = request.body;

    let mainProductTotalAmount: number = 0;
    let mainProductQuantity: number = 0;
    let upsellProductTotalAmount: number = 0;
    let upsellProductQuantity: number = 0;

    // Calculate total amount and quantity for main products
    purchasedProducts.forEach((mainProduct) => {
      if (mainProduct.price) {
        mainProductTotalAmount += mainProduct.price * mainProduct.quantity;
      }
      if (mainProduct.quantity) {
        mainProductQuantity += mainProduct.quantity;
      }
      mainProduct.ProductUpsells.forEach((upsellProduct) => {
        if (upsellProduct.price) {
          upsellProductTotalAmount +=
            upsellProduct.price * upsellProduct.quantity;
        }
        if (upsellProduct.quantity) {
          upsellProductQuantity += upsellProduct.quantity;
        }
      });
    });

    // Calculate total amount and total quantity
    const totalAmount: number =
      mainProductTotalAmount + upsellProductTotalAmount;
    const totalQuantity: number = mainProductQuantity + upsellProductQuantity;

    // ADD A PURCHASE TRANSACTION
    const newProduct = await createTransactionWithProducts(
      email,
      totalAmount,
      totalQuantity,
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
    console.error("Error creating transaction with products:", error);
    reply.code(500).send(errorResponse);
  }
}
