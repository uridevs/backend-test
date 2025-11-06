import { Router } from "express";
import { getSimilarProductsHandler } from "./controllers/product.controller";

const router = Router();

router.get("/:productId/similar", getSimilarProductsHandler);

export default router;
