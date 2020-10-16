'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserStatus)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING, allowNull: false, unique: true,
      validate: {
        notNull: { args: true, msg: "" }
      }
    },
    email: {
      type: DataTypes.STRING, allowNull: false, unique: true,
      validate: {
        notNull: { args: true, msg: "" },
        isEmail: { args: true, msg: "" }
      }
    },
    password: {
      type: DataTypes.STRING, allowNull: false,
      validate: {
        notNull: { args: true, msg: "" }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};