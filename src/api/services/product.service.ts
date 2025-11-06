import { Product } from "../../interfaces/product.interface";
import { productClient } from "../dal/product.client";

class ProductService {
  public async getSimilarProducts(productId: string) {
    console.log(`[ProductService] Iniciando búsqueda para: ${productId}`);

    const similarIds = await productClient.getSimilarProductIds(productId);

    if (!similarIds || similarIds.length === 0) {
      console.log(
        `[ProductService] No se encontraron IDs similares para: ${productId}`
      );
      return [];
    }

    console.log(
      `[ProductService] IDs encontrados: ${similarIds.join(", ")}. Obteniendo detalles...`
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
          `[ProductService] Error al obtener detalle para ID ${failedId}:`,
          result.reason?.message || "Error desconocido"
        );
      }
    });

    console.log(
      `[ProductService] Detalles de ${successfulProducts.length} productos obtenidos exitosamente.`
    );

    return successfulProducts;
  }
}

export const productService = new ProductService();
