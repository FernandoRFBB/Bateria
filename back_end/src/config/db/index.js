const { Sequelize, Model } = require('sequelize');

const dbConfig = require('./database');
const Usuario = require('../../models/Usuario');
const Escola = require('../../models/Escola');
const Instrumento = require('../../models/Instrumento');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Escola.init(connection);
Instrumento.init(connection);

Usuario.associate(connection.models);
Escola.associate(connection.models);
Instrumento.associate(connection.models);

module.exports = connection;