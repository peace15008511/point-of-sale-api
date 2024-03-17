import Products from "../models/product.model";
import fastify from "fastify";

const server = fastify({ logger: true });

export async function createProduct(
  name: string,
  description: string,
  price: number,
  quantity: number
) {
  try {
    // Create the product
    const addProduct = await Products.create({
      name,
      description,
      price,
      quantity,
    });
    server.log.info(
      "Products.service.ts: addProduct Response:" + JSON.stringify(addProduct)
    );
    return addProduct;
  } catch (error) {
    server.log.error("Products.service.ts: Error creating product:", error);
    throw new Error("Internal server error");
  }
}

export async function getProducts() {
  try {
    // Get all products
    const products = await Products.findAll();
    server.log.error(
      "Products.service.ts: fetched products:",
      JSON.stringify(products)
    );
    return products;
  } catch (error) {
    server.log.error("Products.service.ts: Error fetching products:", error);
    throw new Error("Internal server error");
  }
}

export async function deleteProduct(id: number) {
  try {
    // Find the product by its ID
    const productToDelete = await Products.findByPk(id);
    server.log.info(
      "Products.service.ts: productToDelete Response is:" +
        JSON.stringify(productToDelete)
    );
    if (productToDelete) {
      //Delete the product
      const deleteProduct = await productToDelete.destroy();
      server.log.info(
        "Products.service.ts: deleteProduct Response is:" +
          JSON.stringify(deleteProduct)
      );
      return deleteProduct;
    } else {
      server.log.info(
        "Products.service.ts: Product to delete not found Response is:"
      );
      throw new Error("Internal server error");
    }
  } catch (error) {
    server.log.error("Products.service.ts: Error fetching products:", error);
    throw new Error("Internal server error");
  }
}
/********************************************* UPDATE PRODUCT USING ID **************************************************************/
interface newProductInt {
  name: any;
  description: any;
  price: any;
  quantity: any;
}

export async function updateProduct(id: number, newProduct: newProductInt) {
  try {
    // Find the product by its ID
    const productToUpdate = await Products.findByPk(id);
    server.log.info(
      "Products.service.ts: Product to update is:",
      productToUpdate
    );
    if (!productToUpdate) {
      throw new Error("nternal server error");
    } else {
      //only update products that are not null
      if (newProduct.name != null) productToUpdate.name = newProduct.name;
      if (newProduct.description != null)
        productToUpdate.description = newProduct.description;
      if (newProduct.price != null) productToUpdate.price = newProduct.price;
      if (newProduct.quantity != null)
        productToUpdate.quantity = newProduct.quantity;

      const updatedProduct = await productToUpdate.save();
      server.log.info(
        "Products.service.ts: Update Product Response is:" +
          JSON.stringify(updatedProduct)
      );
      return updatedProduct;
    }
  } catch (error) {
    server.log.error("Products.service.ts: Error fetching products:", error);
    throw new Error("Internal server error");
  }
}
/********************************************* END OF UPDATE PRODUCT USING ID **************************************************************/
