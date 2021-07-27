const express = require("express");
const routes = express.Router();

const InstrumentoController = require("../controllers/InstrumentoController");

routes.get("/", InstrumentoController.list);
routes.get("/:id", InstrumentoController.listOne);
routes.put("/:id", InstrumentoController.update);
// routes.post("/", InstrumentoController.create);
// routes.delete("/:id", InstrumentoController.deleteOne);

module.exports = routes;