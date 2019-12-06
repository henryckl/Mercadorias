const { Router } = require("express");

const LoginController = require("./app/controllers/LoginController");

const routes = new Router();

routes.get("/", function(req, res) {
  res.send("OK");
});

module.exports = routes;
