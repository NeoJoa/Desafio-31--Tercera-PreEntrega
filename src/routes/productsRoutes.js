import { Router } from "express";
import * as productsController from "../controller/products.controller.js";
import dbProductManager from "../dao/dbManager/ProductsManager.js";
const router = Router();

const dbpm = new dbProductManager();

router.post("/", productsController.post);

router.get("/?", productsController.getAll);

router.get("/:pid", productsController.getById);

router.put("/:pid", productsController.putById);

router.delete("/:pid", productsController.deleteById);
export default router;
