import { Router } from "express";
import productRouter from "./product.routes";

const mainRouter = Router();

mainRouter.use("/product", productRouter);

export default mainRouter;
