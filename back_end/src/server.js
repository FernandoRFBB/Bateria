const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
require("dotenv").config();

require("./config/db/config");

app.use(sessions({
    secret: process.env.SS_SECRET,
    saveUninitialized: false,
    resave: false,
}))
 

// Arquivos de rotas
const routesEscola = require("./routes/routesEscola"); // Importando arquivo de rota
const routesInstrumento = require("./routes/routesInstrumento");
const routesUsuario = require("./routes/routesUsuario");
const routesLimite = require("./routes/routesLimite");
const routesLogin = require("./routes/routesLogin");

app.use(express.json()); // Para poder usar express com json

// Usando as rotas importadas

app.use("/api/escolas/", routesEscola);
app.use("/api/instrumentos/", routesInstrumento);
app.use("/api/usuarios", routesUsuario);
app.use("/api/limites", routesLimite);
app.use("/api/login/", routesLogin)

app.listen(process.env.SV_PORT);
