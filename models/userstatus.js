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
    hp: { type: DataTypes.INTEGER, allowNull: false,
      validate: {
        min:{
          args:[0],
          msg:'cannot post with negative value'
        }
      }
     },
    atk: { type: DataTypes.INTEGER, allowNull: false,
      validate: {
        min:{
          args:[0],
          msg:'cannot post with negative value'
        }
      }
     },
    def: { type: DataTypes.INTEGER, allowNull: false,
      validate: {
        min:{
          args:[0],
          msg:'cannot post with negative value'
        }
      }
    },
    requiredExp: { type: DataTypes.INTEGER, allowNull: false },
    collectedExp: { type: DataTypes.INTEGER, allowNull: false,
    validate: {
      isInt:{
        args:[true],
        msg: 'Invalid type of exp'
      }
    }
  },
    money: { type: DataTypes.INTEGER, allowNull: false },
    maxDifficulty: { type: DataTypes.INTEGER, allowNull: false,
      validate: {
        min:{
          args:[0],
          msg:'Cannot Post with Negative Value'
        }
      }
     },
    currentDifficulty: { type: DataTypes.INTEGER, allowNull: false,
      validate: {
        min:{
          args:[0],
          msg:'Cannot Post with Negative Value'
        }
      }
     },
    reputation: { type: DataTypes.INTEGER, allowNull: false },
    UserId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'UserStatus',
  });
  return UserStatus;
};
