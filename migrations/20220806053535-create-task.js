'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Title: {
        type: Sequelize.STRING
      },
      Action_Time: {
        type: Sequelize.INTEGER
      },
      Is_Finished: {
        type: Sequelize.BOOLEAN
      },
      Created_Time: {
        type: Sequelize.INTEGER
      },
      Updated_Time: {
        type: Sequelize.INTEGER
      },
      Objective_List: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};