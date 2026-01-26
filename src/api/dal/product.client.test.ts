import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotFoundError } from "../../utils/errors";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("axios", () => {
  return {
    default: {
      create: vi.fn(() => ({
        get: mocks.get,
        defaults: { headers: {} },
        interceptors: {
          request: { use: vi.fn(), eject: vi.fn() },
          response: { use: vi.fn(), eject: vi.fn() },
        },
      })),
      isAxiosError: (payload: any) => !!payload.isAxiosError,
    },
  };
});

vi.mock("axios-retry", () => ({
  default: vi.fn(),
}));

import { productClient } from "./product.client";

describe("ProductClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getSimilarProductIds", () => {
    it("should return similar product IDs when the call is successful", async () => {
      const mockData = ["1", "2", "3"];
      mocks.get.mockResolvedValue({ data: mockData });

      const result = await productClient.getSimilarProductIds("123");

      expect(result).toEqual(mockData);
      expect(mocks.get).toHaveBeenCalledWith("/product/123/similarids");
    });

    it("should throw NotFoundError when 404 is returned", async () => {
      const error = new Error("Not found") as any;
      error.isAxiosError = true;
      error.response = { status: 404 };
      mocks.get.mockRejectedValue(error);

      await expect(productClient.getSimilarProductIds("123")).rejects.toThrow(
        NotFoundError,
      );
      await expect(productClient.getSimilarProductIds("123")).rejects.toThrow(
        /Product with ID 123 not found/,
      );
    });

    it("should throw original error for other axios errors (e.g. 500)", async () => {
      const error = new Error("Internal Server Error") as any;
      error.isAxiosError = true;
      error.response = { status: 500 };
      mocks.get.mockRejectedValue(error);

      await expect(productClient.getSimilarProductIds("123")).rejects.toThrow(
        "Internal Server Error",
      );
    });

    it("should throw original error for generic errors", async () => {
      const error = new Error("Network Error");
      mocks.get.mockRejectedValue(error);

      await expect(productClient.getSimilarProductIds("123")).rejects.toThrow(
        "Network Error",
      );
    });
  });

  describe("getProductDetails", () => {
    it("should return product details when call is successful", async () => {
      const mockProduct = {
        id: "1",
        name: "Test Product",
        price: 100,
        availability: true,
      };
      mocks.get.mockResolvedValue({ data: mockProduct });

      const result = await productClient.getProductDetails("1");

      expect(result).toEqual(mockProduct);
      expect(mocks.get).toHaveBeenCalledWith("/product/1");
    });

    it("should throw error when call fails", async () => {
      const error = new Error("Connection refused");
      mocks.get.mockRejectedValue(error);

      await expect(productClient.getProductDetails("1")).rejects.toThrow(
        "Connection refused",
      );
    });
  });
});
