const express = require("express");
const routes = express.Router();

const UsuarioController = require("../controllers/UsuarioController");


routes.get("/:escola_id", UsuarioController.list);
routes.get("/:escola_id/:id", UsuarioController.listOne);
routes.put("/:escola_id/:id", UsuarioController.update);
routes.post("/:escola_id", UsuarioController.create);
routes.delete("/:escola_id/:id", UsuarioController.deleteOne);


module.exports = routes;