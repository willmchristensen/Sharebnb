'use strict';
const bcrypt = require("bcryptjs");
const {Op} = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId:1,
        review:'probably the nicest place i have ever seen in my life',
        stars:5
      },
      {
        spotId:2,
        userId:2,
        review:'Without a doub,t definitely, comfiest place i have ever been in my life',
        stars:4.1
      },
      {
        spotId:3,
        userId:3,
        review:'Disgusting, i hated every second of the experience.',
        stars:4.3
      },
      {
        spotId:4,
        userId:4,
        review:'probably the nicest place i have ever seen in my life',
        stars:4
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3]
      }
    })
  }
};
