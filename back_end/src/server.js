const express = require("express");
const app = express();

require("./config/db/index");

// Arquivos de rotas
const routesEscola = require("./routes/routesEscola"); // Importando arquivo de rota
const routesInstrumento = require("./routes/routesInstrumento");
const routesUsuario = require("./routes/routesUsuario");

app.use(express.json()); // Para poder usar express com json

// Usando as rotas importadas

app.use("/api/escolas/", routesEscola);
app.use("/api/instrumentos/", routesInstrumento);
app.use("/api/usuarios", routesUsuario);

app.listen(3000);