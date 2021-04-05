const express = require("express");
const routes = express.Router();

const UsuarioController = require("../controllers/UsuarioController");

routes.get("/", UsuarioController.list);
routes.get("/:id", UsuarioController.listOne);
routes.put("/:id", UsuarioController.update);
routes.post("/", UsuarioController.create);
routes.delete("/:id", UsuarioController.deleteOne)

module.exports = routes;