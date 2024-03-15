import Products from "../models/product.model";

export async function createProduct(
  name: string,
  description: string,
  price: string,
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
    return addProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Internal server error");
  }
}

export async function getProducts() {
  try {
    // Get all products
    const products = await Products.findAll();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Internal server error");
  }
}

export async function deleteProduct(id: number) {
  try {
    // Find the product by its ID
    const productToDelete = await Products.findByPk(id);
    if (productToDelete) {
      //Delete the product
      const deleteProduct = await productToDelete.destroy();
      return deleteProduct;
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
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
    if (!productToUpdate) {
      throw new Error("Internal server error");
    } else {
      /**
       *   //product items that are not being updated will come with default variables below from the controller
       *   {
       *      "name": null,
       *      "description": null,
       *      "price": null,
       *      "quantity": null
       *    }
       */

      if (newProduct.name != null) productToUpdate.name = newProduct.name;
      if (newProduct.description != null)
        productToUpdate.description = newProduct.description;
      if (newProduct.price != null) productToUpdate.price = newProduct.price;
      if (newProduct.quantity != null)
        productToUpdate.quantity = newProduct.quantity;

      const updatedProduct = await productToUpdate.save();
      return updatedProduct;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Internal server error");
  }
}
/********************************************* END OF UPDATE PRODUCT USING ID **************************************************************/
