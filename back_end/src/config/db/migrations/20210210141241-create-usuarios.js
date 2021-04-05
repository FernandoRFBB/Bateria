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
        type: Sequelize.INTEGER(11),
      },
      telefone: {
        type: Sequelize.INTEGER(11),
      },
      tam_camisa: {
        type: Sequelize.STRING(7),
      },
      tam_calca: {
        type: Sequelize.STRING(7),
      },
      tam_calcado: {
        type: Sequelize.INTEGER(2),
      },
      diretor: {
        type: Sequelize.STRING(1),
        defaultValue: "N",
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
