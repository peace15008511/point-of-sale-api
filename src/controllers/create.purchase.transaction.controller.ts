import { fastify, FastifyRequest, FastifyReply } from "fastify";
import { createPurchaseTransaction } from "../services/transaction.services";

const server = fastify({ logger: true });

/******************* BUILDING UP REQUEST BODY INTERFACE *******************/
interface upsellProductInt {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface mainProductsInt {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  ProductUpsells: upsellProductInt[];
}

// DEFINE REQUEST BODY INTERFACE
interface reqeustBodyInt {
  email: string;
  purchasedProducts: mainProductsInt[];
}
/******************* END OF BUILDING REQUEST BODY INTERFACE *******************/

/** LIST ALL RESPONSE INTERFACES AND DEFAULT RESPONSES */
// Define an interface for the response
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
/******************* END OF BUILDING REQUEST BODY INTERFACE *******************/

export async function createProductsTransactionController(
  request: FastifyRequest<{ Body: reqeustBodyInt }>,
  reply: FastifyReply
) {
  try {
    const { email, purchasedProducts } = request.body;

    let mainProductTotalAmount: number = 0;
    let mainProductQauntity: number = 0;
    let upsellProductTotalAmount: number = 0;
    let upsellProductQauntity: number = 0;

    purchasedProducts.forEach((mainProduct) => {
      if (mainProduct.price) {
        mainProductTotalAmount =
          mainProductTotalAmount + mainProduct.price * mainProduct.quantity;
      }
      if (mainProduct.quantity) {
        mainProductQauntity += mainProduct.quantity;
      }
      mainProduct.ProductUpsells.forEach((upsellProduct) => {
        if (upsellProduct.price) {
          upsellProductTotalAmount =
            upsellProductTotalAmount + mainProduct.price * mainProduct.quantity;
        }
        if (upsellProduct.quantity) {
          upsellProductQauntity += upsellProduct.quantity;
        }
      });
    });

    const totalAmount: number =
      mainProductTotalAmount + upsellProductTotalAmount;

    const totalQaulity: number = mainProductQauntity + upsellProductQauntity;

    //ADD A PURCHASE TRANSACTION
    const newProduct = await createPurchaseTransaction(
      email,
      totalAmount,
      totalQaulity
    );

    server.log.info(
      "create.product.controller.ts: create new product reeesponse:" +
        JSON.stringify(newProduct)
    );
    if (!newProduct) {
      reply.code(500).send(errorResponse);
    } else {
      reply.code(201).send(successResponse);
    }
  } catch (error: any) {
    reply.code(500).send(errorResponse);
  }
}
