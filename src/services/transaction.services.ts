import Transactions from "../models/transaction.model";

export async function createPurchaseTransaction(
  email: string,
  totalAmount: number,
  totalQuantity: number
) {
  try {
    const purchaseTransaction = await Transactions.create({
      email,
      totalAmount,
      totalQuantity,
    });
    return purchaseTransaction;
  } catch (error: any) {
    console.error("Error creating purchase transaction:", error);
    throw new Error("Internal server error");
  }
}
