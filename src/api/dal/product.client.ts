import axios, { AxiosInstance, AxiosError } from "axios";
import { config } from "../../config";
import { Product, SimilarProductIds } from "../../interfaces/product.interface";
import { NotFoundError } from "../../utils/errors";

class ProductClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.mockApiUrl, // URL base
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  public async getSimilarProductIds(
    productId: string
  ): Promise<SimilarProductIds> {
    try {
      const response = await this.client.get<SimilarProductIds>(
        `/product/${productId}/similarids`
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new NotFoundError(`Product with ID ${productId} not found`);
        }
        console.error(
          `[ProductClient] AxiosError fetching similar IDs for ${productId}:`,
          error.message
        );
      } else if (error instanceof Error) {
        console.error(
          `[ProductClient] Error fetching similar IDs for ${productId}:`,
          error.message
        );
      } else {
        console.error(
          `[ProductClient] Unknown error fetching similar IDs for ${productId}:`,
          error
        );
      }
      throw error;
    }
  }

  public async getProductDetails(productId: string): Promise<Product> {
    try {
      const response = await this.client.get<Product>(`/product/${productId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `[ProductClient] AxiosError fetching details for ${productId}:`,
          error.message
        );
      } else if (error instanceof Error) {
        console.error(
          `[ProductClient] Error fetching details for ${productId}:`,
          error.message
        );
      } else {
        console.error(
          `[ProductClient] Unknown error fetching details for ${productId}:`,
          error
        );
      }

      throw error;
    }
  }
}

export const productClient = new ProductClient();
