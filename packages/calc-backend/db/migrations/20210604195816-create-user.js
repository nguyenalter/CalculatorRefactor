module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      // User model define here
      id: { type: Sequelize.INTEGER, autoIncrement: true },
      username: {
        // Different between text and string type
        // in sequelize is that: string -> VARCHAR(255)
        // but text -> TEXT , TEXT is equal to VARCHAR in postgres
        // (can be any length lower than maximum size)
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING,
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
