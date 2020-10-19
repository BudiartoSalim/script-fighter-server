'use strict';
let data = require('../JSON-Seed/db-item.json')
data = data.map((el) =>{
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
})
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('ItemShops', data , {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkInsert('ItemShops', null , {});
  }
};
