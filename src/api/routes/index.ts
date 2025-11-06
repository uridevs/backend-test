import { Router } from "express";
import productRouter from "./product.routes";

const apiV1Router = Router();

apiV1Router.use("/products", productRouter);

export default apiV1Router;
