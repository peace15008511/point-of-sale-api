import Products from "../models/product.model";

export async function createProduct(
  name: string,
  description: string,
  price: string,
  quantity: number
) {
  try {
    // Create the product

    const newProduct = await Products.create({
      name,
      description,
      price,
      quantity,
    });
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Internal server error");
  }
}
