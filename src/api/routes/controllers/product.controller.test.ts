import { describe, it, expect, vi, beforeEach } from "vitest";
import { getSimilarProductsHandler } from "./product.controller";
import { productService } from "../../services/product.service";
import { Request, Response } from "express";

describe("ProductController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  it("should return 200 and products when service succeeds", async () => {
    // Arrange
    const mockProducts = [
      { id: "1", name: "Test", price: 10, availability: true },
    ];
    mockRequest = { params: { productId: "123" } };

    const spy = vi
      .spyOn(productService, "getSimilarProducts")
      .mockResolvedValue(mockProducts);

    // Act
    await getSimilarProductsHandler(
      mockRequest as Request,
      mockResponse as Response,
      next,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
    expect(spy).toHaveBeenCalledWith("123");
  });

  it("should call next(error) if service fails", async () => {
    const error = new Error("Service Failure");
    mockRequest = { params: { productId: "123" } };

    vi.spyOn(productService, "getSimilarProducts").mockRejectedValue(error);

    await getSimilarProductsHandler(
      mockRequest as Request,
      mockResponse as Response,
      next,
    );

    expect(next).toHaveBeenCalledWith(error);
  });
});
