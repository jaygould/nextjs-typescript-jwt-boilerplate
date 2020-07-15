'use strict';
module.exports = {
  up: (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable('login_activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING
      },
      activityType: {
        type: Sequelize.STRING
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
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.dropTable('login_activities');
  }
};
