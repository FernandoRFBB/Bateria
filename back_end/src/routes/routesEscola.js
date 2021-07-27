const express = require("express");
const routes = express.Router();

const EscolaController = require("../controllers/EscolaController");

routes.get("/:escola_id/tamanhos", EscolaController.tamanhos);
routes.get("/", EscolaController.list);
routes.get("/:id", EscolaController.listOne);
routes.put("/:id", EscolaController.update);
routes.post("/", EscolaController.create);
//routes.delete("/:id", EscolaController.deleteOne);

module.exports = routes;