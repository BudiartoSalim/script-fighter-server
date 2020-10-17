const bcrypt = require('bcryptjs');

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
        notNull: { args: true, msg: "Username is already used." }
      }
    },
    email: {
      type: DataTypes.STRING, allowNull: false, unique: true,
      validate: {
        notNull: { args: true, msg: "Email unavailable." },
        isEmail: { msg: "Must be an email format." }
      }
    },
    password: {
      type: DataTypes.STRING, allowNull: false,
      validate: {
        notNull: { args: true, msg: "Password cannot be empty." }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (data) => {
    const salt = bcrypt.genSaltSync(10);
    if (Array.isArray(data)) {
      data.forEach((element) => {
        element.password = bcrypt.hashSync(element.password, salt);
      })
    } else {
      data.password = bcrypt.hashSync(data.password, salt);
    }
  })

  return User;
};