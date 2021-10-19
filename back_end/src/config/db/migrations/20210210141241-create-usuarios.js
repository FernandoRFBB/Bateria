'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(11),
      },
      telefone: {
        type: Sequelize.STRING(11),
      },
      tam_camisa: {
        type: Sequelize.STRING(7),
      },
      tam_calca: {
        type: Sequelize.STRING(7),
      },
      tam_calcado: {
        type: Sequelize.STRING(2),
      },
      diretor: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0,
      },
      foto: {
        type: Sequelize.STRING(20),
      },
      escola_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "escolas",
          key: "id"
        },
        onUpdate: "CASCADE",
      },
      instrumento_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "instrumentos",
          key: "id"
        },
        onUpdate: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("usuarios");
  }
};
