const { Router } = require("express");

const RegisterController = require("./app/controllers/RegisterController");

const routes = new Router();

routes.post("/", RegisterController.store);

module.exports = routes;
