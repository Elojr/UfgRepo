module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('professor', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      institute: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('professor');
  },
};
