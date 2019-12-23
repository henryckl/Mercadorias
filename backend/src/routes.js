const { Router } = require("express");

const RegisterController = require("./app/controllers/RegisterController");
const LoginController = require("./app/controllers/LoginController");
const ProductController = require("./app/controllers/ProductController");
const EmailController = require("./app/controllers/EmailController");

const user_auth = require("./app/middlewares/user_auth");
const adm_auth = require("./app/middlewares/adm_auth");

const routes = new Router();

routes.post("/", LoginController.store);

routes.post("/register", RegisterController.store);
routes.post("/products", adm_auth, ProductController.store);
routes.get("/products", adm_auth, ProductController.index);
routes.post("/email", EmailController.send);
routes.get("/home", ProductController.index);
routes.post("/me", adm_auth, async (req, res) => {
  res.json(req.user);
});

module.exports = routes;
