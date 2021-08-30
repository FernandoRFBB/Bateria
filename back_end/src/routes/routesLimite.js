const express = require("express");
const routes = express.Router();

const LimiteController = require("../controllers/LimiteController");
    
routes.get("/", LimiteController.list);
routes.get("/:instrumento_id", LimiteController.listOne);
routes.put("/:instrumento_id", LimiteController.update);

module.exports = routes; 