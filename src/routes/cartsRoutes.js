import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isUser } from "../middlewares/isUser.js";
import * as cartsController from "../controller/carts.controller.js";

const router = Router();

router.get("/", isAdmin, cartsController.getAll);

router.get("/:cid", isAdmin, cartsController.getById);

router.post("/", isAdmin, cartsController.post);

router.post("/:cid/products/:pid", isUser, cartsController.postProductToCart);

router.post("/:cid/purchase", isUser, cartsController.purchase);

router.put("/:cid/products", isUser, cartsController.putProducts);

router.put("/:cid/products/:pid", isUser, cartsController.putProductQuantity);

router.delete(
  "/:cid/products/:pid",
  isUser,
  cartsController.deleteProductToCart
);

router.delete("/:cid/products", isUser, cartsController.deleteProducts);

router.delete("/:cid", isAdmin, cartsController.deleteById);

export default router;
