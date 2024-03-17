import fastify from "fastify";

import {
  Transaction,
  MainProduct,
  UpsellProduct,
} from "../models/transaction.model";
const server = fastify({ logger: true });
/******************* BUILDING UP REQUEST DATA*******************/
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

/******************* END OF BUILDING PRODUCT DATA*******************/

export async function createTransactionWithProducts(
  email: string,
  totalAmount: number,
  totalQuantity: number,
  totalMainProductsQauntity: number,
  totalUpsellProductsQauntity: number,
  purchasedProducts: MainProductInt[]
): Promise<Transaction> {
  try {
    // Create the transaction
    const transaction = await Transaction.create({
      email,
      totalAmount: totalAmount.toFixed(2), // Round to 2 decimal places
      totalQuantity,
      totalMainProductsQauntity,
      totalUpsellProductsQauntity,
    });

    // Create main products and their associated upsell products
    for (const productData of purchasedProducts) {
      const mainProduct = await MainProduct.create({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        quantity: productData.quantity,
        TransactionId: transaction.transactionId, // Use transaction.TransactionId to reference the transaction's id
      });

      // Create upsell products associated with the main product
      if (productData.upsellProducts && productData.upsellProducts.length > 0) {
        for (const upsellData of productData.upsellProducts) {
          await UpsellProduct.create({
            name: upsellData.name,
            description: upsellData.description,
            price: upsellData.price,
            quantity: upsellData.quantity,
            MainProductId: mainProduct.mainProductId, // Use mainProduct.mainProductId to reference the main product's id
          });
        }
      }
    }

    return transaction;
  } catch (error: any) {
    console.error("Error creating transaction with products:", error.message);
    throw new Error("Internal server error");
  }
}

export async function getTransactionById(transactionId: number) {
  try {
    const transaction = await Transaction.findByPk(transactionId, {
      include: [{ all: true, nested: true }], // Include all associated models
    });

    server.log.info(
      "transaction.service.ts: Transaction is:" + JSON.stringify(transaction)
    );
    return transaction;
  } catch (error: any) {
    console.error("Error retrieving transaction details:", error);
    throw new Error("Internal server error");
  }
}
