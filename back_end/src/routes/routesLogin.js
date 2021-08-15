const express = require("express");
const routes = express.Router();

const LoginController = require("../controllers/LoginController")

routes.get("/", LoginController.list);
routes.post("/", LoginController.login);
routes.post("/criar", LoginController.create);
routes.get("/isLogged", LoginController.isLogged);
routes.get("/logout", LoginController.logout);

module.exports = routes;