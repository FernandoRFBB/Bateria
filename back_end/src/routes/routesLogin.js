const express = require("express");
const routes = express.Router();

const LoginController = require("../controllers/LoginController")

routes.get("/", LoginController.list);
routes.post("/", LoginController.create);
routes.post("/auth", LoginController.auth);
routes.get("/logout", LoginController.logout);

module.exports = routes; 