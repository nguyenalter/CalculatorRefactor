"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Histories, {
        as: "Histories",
        foreignKey: "username",
      });
    }
  }
  User.init(
    {
      // User model define here
      id: { type: DataTypes.INTEGER, autoIncrement: true },
      username: {
        // Different between text and string type
        // in sequelize is that: string -> VARCHAR(255)
        // but text -> TEXT , TEXT is equal to VARCHAR in postgres
        // (can be any length lower than maximum size)
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return User;
};
