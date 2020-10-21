'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemShop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ItemShop.init({
    item_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    atk: DataTypes.INTEGER,
    hp: DataTypes.INTEGER,
    def: DataTypes.INTEGER,
    difficulty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ItemShop',
  });
  return ItemShop;
};
