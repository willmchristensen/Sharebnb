'use strict';
const bcrypt = require("bcryptjs");
const {Op} = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages',
    await queryInterface.bulkInsert(options, [
      {
        "spotId":1,
        "url":'a',
        "preview":true,
      },
      {
        "spotId":2,
        "url":'b',
        "preview":true,
      },
      {
        "spotId":3,
        "url":'c',
        "preview":true,
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages',
    await queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3]
      }
    })
  }
};
