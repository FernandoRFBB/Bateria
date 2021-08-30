const express = require("express");
const routes = express.Router();

const UsuarioController = require("../controllers/UsuarioController");


routes.get("/", UsuarioController.list);
routes.get("/:id", UsuarioController.listOne);
routes.get("/instrumento/:instrumento_id", UsuarioController.listByInstrumento)
routes.put("/:id", UsuarioController.update);
routes.post("", UsuarioController.create);
routes.delete("/:id", UsuarioController.deleteOne);

module.exports = routes; 