import { describe, it, expect, vi, beforeEach } from "vitest";
import { globalErrorHandler } from "./errorHandler";
import { Request, Response } from "express";
import { NotFoundError } from "./errors";

describe("GlobalErrorHandler", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockRequest = {};
  });

  it("should handle custom NotFoundError with status 404", () => {
    const error = new NotFoundError("Product not found");

    globalErrorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      next,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Product not found",
    });
  });

  it("should handle generic errors with status 500", () => {
    const error = new Error("Unexpected crash");

    globalErrorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      next,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
      }),
    );
  });
});
