import { Router } from "express";
import { isUser } from "../middlewares/isUser.js";
import ProductManager from "../dao/classes/dbManager/ProductsManager.js";
import CartsManager from "../dao/classes/dbManager/CartsManager.js";

const router = Router();
const pm = new ProductManager();
const cm = new CartsManager();

router.get("/", async (req, res) => {
  const isLogin = req.cookies["coderCookieToken"] ? true : false;
  res.render("home", { isLogin });
});

router.get("/chat", isUser, async (req, res) => {
  const isLogin = req.cookies["coderCookieToken"] ? true : false;
  res.render("chat", { isLogin });
});

router.get("/products?", async (req, res) => {
  const isLogin = req.cookies["coderCookieToken"] ? true : false;
  const user = req.user;
  const { query, limit, page, sort } = req.query;
  const response = await pm.getAll(query, limit, page, sort);
  let {
    payload,
    hasNextPage,
    hasPrevPage,
    nextLink,
    prevLink,
    page: resPage,
  } = response;
  if (hasNextPage)
    nextLink = `http://localhost:8080/products/?${
      query ? "query=" + query + "&" : ""
    }${"limit=" + limit}${"&page=" + (+resPage + 1)}${
      sort ? "&sort=" + sort : ""
    }`;
  if (hasPrevPage)
    prevLink = `http://localhost:8080/products/?${
      query ? "query=" + query + "&" : ""
    }${"limit=" + limit}${"&page=" + (+resPage - 1)}${
      sort ? "&sort=" + sort : ""
    }`;
  return res.render("products", {
    payload,
    hasNextPage,
    hasPrevPage,
    nextLink,
    prevLink,
    resPage,
    isLogin,
    user,
  });
});

router.get("/carts/:cid", async (req, res) => {
  const isLogin = req.cookies["coderCookieToken"] ? true : false;
  const id = req.params.cid;
  const cart = await cm.getById(id);
  return !cart.error
    ? res.render("cart", { cart, isLogin })
    : res.render("404", {});
});

router.get("/register", (req, res) => {
  return res.render("register", {});
});

router.get("/login", (req, res) => {
  return res.render("login", {});
});

router.get("/recover", (req, res) => {
  return res.render("recoverPassword", {});
});

router.get("/profile", isUser, (req, res) => {
  const isLogin = req.user ? true : false;
  return isLogin ? res.render("profile", { isLogin }) : res.redirect("/login");
});

export default router;
