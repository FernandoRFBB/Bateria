'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return (
      queryInterface.addColumn(
        "usuarios",
        "foto",
        {
          type: Sequelize.STRING(30)
        }
      ),
      queryInterface.addColumn(
        "instrumentos",
        "foto",
        {
          type: Sequelize.STRING(30)
        }
      )
    )
  },

  down: async (queryInterface, Sequelize) => {
    return (
      queryInterface.removeColumn(
        "usuarios",
        "foto"
      ),
      queryInterface.removeColumn(
        "instrumentos",
        "foto"
      )
    )
  }
};
