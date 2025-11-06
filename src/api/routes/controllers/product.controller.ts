import { Request, Response, NextFunction } from "express";
import { productService } from "../../services/product.service";

export const getSimilarProductsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
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
    next(error);
  }
};
