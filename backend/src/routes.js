const { Router } = require("express");

const RegisterController = require("./app/controllers/RegisterController");
const LoginController = require("./app/controllers/LoginController");
const user_auth = require("./app/middlewares/user_auth");
const adm_auth = require("./app/middlewares/adm_auth");

const routes = new Router();

routes.post("/", LoginController.store);

routes.post("/register", RegisterController.store);
routes.post("/me", adm_auth, async (req, res) => {
  res.json(req.user);
});

module.exports = routes;
