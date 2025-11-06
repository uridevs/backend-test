import { Request, Response } from "express";
import { productService } from "../../services/product.service";

export const getSimilarProductsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ message: "Error: productId es requerido." });
    }

    const similarProducts = await productService.getSimilarProducts(productId);

    res.status(200).json(similarProducts);
  } catch (error) {
    // TODO handle errors
    console.error("[ProductController] Error:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
