'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserStatus.belongsTo(models.User)
    }
  };
  UserStatus.init({
    level: { type: DataTypes.INTEGER, allowNull: false },
    hp: { type: DataTypes.INTEGER, allowNull: false },
    atk: { type: DataTypes.INTEGER, allowNull: false },
    def: { type: DataTypes.INTEGER, allowNull: false },
    requiredExp: { type: DataTypes.INTEGER, allowNull: false },
    collectedExp: { type: DataTypes.INTEGER, allowNull: false },
    money: { type: DataTypes.INTEGER, allowNull: false },
    maxDifficulty: { type: DataTypes.INTEGER, allowNull: false },
    currentDifficulty: { type: DataTypes.INTEGER, allowNull: false },
    reputation: { type: DataTypes.INTEGER, allowNull: false },
    UserId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'UserStatus',
  });
  return UserStatus;
};