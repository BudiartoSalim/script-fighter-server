'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      level: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      hp: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      atk: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      def: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      requiredExp: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      collectedExp: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      money: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      maxDifficulty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      currentDifficulty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      reputation: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserStatuses');
  }
};