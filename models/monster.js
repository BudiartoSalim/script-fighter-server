'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Monster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Monster.init({
    monster_name: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    atk: DataTypes.INTEGER,
    def: DataTypes.INTEGER,
    experience: DataTypes.INTEGER,
    money: DataTypes.INTEGER,
    difficulty: DataTypes.INTEGER,
    monster_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Monster',
  });
  return Monster;
};