import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import * as productsController from "../controller/products.controller.js";

const router = Router();

router.post("/", isAdmin, productsController.post);

router.get("/?", productsController.getAll);

router.get("/:pid", productsController.getById);

router.put("/:pid", isAdmin, productsController.putById);

router.delete("/:pid", isAdmin, productsController.deleteById);

export default router;
