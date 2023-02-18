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
    options.tableName = 'ReviewImages',
    await queryInterface.bulkInsert(options, [
      {
        "reviewId":1,
        "url":'a',
      },
      {
        "reviewId":2,
        "url":'b',
      },
      {
        "reviewId":3,
        "url":'c',
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages',
    await queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3]
      }
    })
  }
};
