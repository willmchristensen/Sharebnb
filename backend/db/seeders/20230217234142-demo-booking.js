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
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId:1,
        startDate:"2021-11-19 20:39:36",
        endDate:"2021-12-19 20:39:36",
      },
      {
        spotId:2,
        userId:2,
        startDate:"2021-1-19 20:39:36",
        endDate:"2021-11-19 20:39:36",
      },
      {
        spotId:3,
        userId:3,
        startDate:"2021-10-19 20:39:36",
        endDate:"2021-11-19 20:39:36",
      },
      {
        spotId:4,
        userId:4,
        startDate:"2021-1-19 20:39:36",
        endDate:"2021-11-19 20:39:36",
      },
      {
        spotId:5,
        userId:4,
        startDate:"2021-1-19 20:39:36",
        endDate:"2021-11-19 20:39:36",
      },
      {
        spotId:6,
        userId:4,
        startDate:"2021-1-19 20:39:36",
        endDate:"2021-11-19 20:39:36",
      },
      {
        spotId:7,
        userId:4,
        startDate:"2020-1-19 20:39:36",
        endDate:"2020-11-19 20:39:36",
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3,4]
      }
    })
  }
};