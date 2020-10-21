'use strict';
let data = require('../JSON-Seed/db-monster.json')
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
    await queryInterface.bulkInsert('Monsters', data , {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Monsters', null , {});
  }
};
