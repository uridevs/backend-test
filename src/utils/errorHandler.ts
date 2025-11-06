import { Request, Response, NextFunction } from "express";
import { ApiError } from "./errors";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("[GlobalErrorHandler] Error capturado:", err.message);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Error interno del servidor",
  });
};
