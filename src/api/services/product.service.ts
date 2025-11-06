import { Product } from "../../interfaces/product.interface";
import { productClient } from "../dal/product.client";

class ProductService {
  public async getSimilarProducts(productId: string) {
    const similarIds = await productClient.getSimilarProductIds(productId);

    if (!similarIds || similarIds.length === 0) {
      console.log(
        `[ProductService] Similar IDs were not found for: ${productId}`
      );
      return [];
    }

    console.log(
      `[ProductService] IDs found: ${similarIds.join(", ")}. Getting details...`
    );

    const productDetailPromises = similarIds.map((id) =>
      productClient.getProductDetails(id)
    );

    const results = await Promise.allSettled(productDetailPromises);

    const successfulProducts: Product[] = [];
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        successfulProducts.push(result.value);
      } else {
        const failedId = similarIds[index];
        console.warn(
          `[ProductService] Error obtaining details for ID ${failedId}:`,
          result.reason?.message || "Unknown Error"
        );
      }
    });

    console.log(
      `[ProductService] Details of ${successfulProducts.length} products successfully obtained.`
    );

    return successfulProducts;
  }
}

export const productService = new ProductService();
