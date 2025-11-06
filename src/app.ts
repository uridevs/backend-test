import express, { Application, Request, Response } from "express";
import apiV1Router from "./api/routes/index";
import { NotFoundError } from "./utils/errors";
import { globalErrorHandler } from "./utils/errorHandler";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP" });
});

app.use("/api/v1", apiV1Router);

app.use((req, res, next) => {
  next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`));
});

app.use(globalErrorHandler);

export default app;
