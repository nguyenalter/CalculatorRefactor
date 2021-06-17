const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  History.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      firstOperand: {
        type: DataTypes.TEXT, // for very long input
        allowNull: false,
      },
      operator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secondOperand: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      result: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // timestamp: {
      //   allowNull: false,
      //   type: DataTypes.STRING,
      // },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Histories',
    },
  );
  return History;
};
