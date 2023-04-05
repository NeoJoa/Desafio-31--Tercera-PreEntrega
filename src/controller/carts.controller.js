import dbCartsManager from "../dao/dbManager/CartsManager.js";

const dbcm = new dbCartsManager();

export const getAll = async (req, res) => {
  const getResponse = await dbcm.getCarts();

  return !getResponse.error
    ? res.send(getResponse)
    : res.status(getResponse.status).send(getResponse);
};

export const getById = async (req, res) => {
  const id = req.params.cid;
  const getResponse = await dbcm.getCartById(id);

  return !getResponse.error
    ? res.send(getResponse)
    : res.status(getResponse.status).send(getResponse);
};

export const post = async (req, res) => {
  const postResponse = await dbcm.post();

  return !postResponse.error
    ? res.send(postResponse)
    : res.status(postResponse.status).send(postResponse);
};

export const postProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const postResponse = await dbcm.postProductToCart(cid, pid);

  return !postResponse.error
    ? res.send(postResponse)
    : res.status(postResponse.status).send(postResponse);
};

export const putProducts = async (req, res) => {
  const cid = req.params.cid;
  const products = req.body;
  const putResponse = await dbcm.putProducts(cid, products);

  return !putResponse.error
    ? res.send(putResponse)
    : res.status(putResponse.status).send(putResponse);
};

export const putProductQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const putResponse = await dbcm.putProductQuantity(cid, pid, quantity);

  return !putResponse.error
    ? res.send(putResponse)
    : res.status(putResponse.status).send(putResponse);
};

export const deleteProductToCart = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const deleteResponse = await dbcm.deleteProductToCart(cid, pid);

  return !deleteResponse.error
    ? res.send(deleteResponse)
    : res.status(deleteResponse.status).send(deleteResponse);
};

export const deleteProducts = async (req, res) => {
  const cid = req.params.cid;
  const deleteResponse = await dbcm.deleteProducts(cid);

  return !deleteResponse.error
    ? res.send(deleteResponse)
    : res.status(deleteResponse.status).send(deleteResponse);
};

export const deleteById = async (req, res) => {
  const cid = req.params.cid;
  const deleteResponse = await dbcm.deleteById(cid);

  return !deleteResponse.error
    ? res.send(deleteResponse)
    : res.status(deleteResponse.status).send(deleteResponse);
};
