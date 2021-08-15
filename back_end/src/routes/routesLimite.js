const express = require("express");
const routes = express.Router();

const LimiteController = require("../controllers/LimiteController");
    
routes.get("/:escola_id", LimiteController.list);
routes.get("/:escola_id/:instrumento_id", LimiteController.listOne);
routes.put("/:escola_id/:instrumento_id", LimiteController.update);

module.exports = routes; 