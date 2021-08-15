const { Sequelize } = require('sequelize');
 
const dbConfig = require('./database');
const Usuario = require('../../models/Usuario');
const Escola = require('../../models/Escola');
const Instrumento = require('../../models/Instrumento');
const Limite = require('../../models/Limite')
const Login = require('../../models/Login')

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Escola.init(connection);
Instrumento.init(connection);
Limite.init(connection);
Login.init(connection);

Usuario.associate(connection.models);
Escola.associate(connection.models);
Instrumento.associate(connection.models);
Limite.associate(connection.models);
Login.associate(connection.models);

module.exports = connection;