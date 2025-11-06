import { Router } from "express";
import { getSimilarProductsHandler } from "./controllers/product.controller";

const router = Router();

// GET /api/v1/products/:productId/similar
router.get("/:productId/similar", getSimilarProductsHandler);

export default router;
