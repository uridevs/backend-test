import { describe, it, expect, vi, beforeEach } from "vitest";
import { productService } from "./product.service";
import { productClient } from "../dal/product.client";

vi.mock("../dal/product.client", () => ({
  productClient: {
    getSimilarProductIds: vi.fn(),
    getProductDetails: vi.fn(),
  },
}));

describe("ProductService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a list of products when all calls are successful", async () => {
    const mockIds = ["1", "2"];
    const mockProduct1 = {
      id: "1",
      name: "Product 1",
      price: 10,
      availability: true,
    };
    const mockProduct2 = {
      id: "2",
      name: "Product 2",
      price: 20,
      availability: true,
    };

    vi.mocked(productClient.getSimilarProductIds).mockResolvedValue(mockIds);
    vi.mocked(productClient.getProductDetails)
      .mockResolvedValueOnce(mockProduct1)
      .mockResolvedValueOnce(mockProduct2);

    const result = await productService.getSimilarProducts("base-id");

    expect(result).toHaveLength(2);
    expect(result).toEqual([mockProduct1, mockProduct2]);
    expect(productClient.getSimilarProductIds).toHaveBeenCalledWith("base-id");
  });

  it("should be resilient and return only successful products if one detail call fails", async () => {
    vi.mocked(productClient.getSimilarProductIds).mockResolvedValue(["1", "2"]);
    vi.mocked(productClient.getProductDetails)
      .mockResolvedValueOnce({
        id: "1",
        name: "Good Product",
        price: 10,
        availability: true,
      })
      .mockRejectedValueOnce(new Error("Timeout!"));

    const result = await productService.getSimilarProducts("base-id");

    const [product] = result;
    expect(product).toBeDefined();
    expect(product?.id).toBe("1");
  });
});
