import Products from "../models/product.model";

export async function linkUpsellProduct(
  productId: number,
  upsellProductId: number
) {
  try {
    const product = await Products.findByPk(productId);
    const upsellProduct = await Products.findByPk(upsellProductId);

    if (!product || !upsellProduct) {
      throw new Error("One or both products not found.");
    }

    await product.addUpsellProduct(upsellProduct);
  } catch (error: any) {
    throw new Error(`Failed to link upsell product: ${error.message}`);
  }
}

export async function unlinkUpsellProduct(
  productId: number,
  upsellProductId: number
) {
  try {
    const product = await Products.findByPk(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    await product.removeUpsellProduct(upsellProductId);
  } catch (error: any) {
    throw new Error(`Failed to unlink upsell product: ${error.message}`);
  }
}

export async function getUpsellProducts(
  productId: number
): Promise<Products[]> {
  try {
    const product = await Products.findByPk(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    const upsellProducts = await product.getUpsellProducts();
    return upsellProducts;
  } catch (error: any) {
    throw new Error(`Failed to retrieve upsell products: ${error.message}`);
  }
}
