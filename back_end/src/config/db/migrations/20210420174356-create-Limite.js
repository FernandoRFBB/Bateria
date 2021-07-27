'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("limites", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      escola_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "escolas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      instrumento_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "instrumentos",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      limite: {
        type: Sequelize.INTEGER(3),
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
    return queryInterface.dropTable("limites");
  }
};
