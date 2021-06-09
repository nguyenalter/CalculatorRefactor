"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Histories", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      firstOperand: {
        type: Sequelize.TEXT, // for very long input
        allowNull: false,
      },
      operator: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      secondOperand: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      result: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Histories");
  },
};
