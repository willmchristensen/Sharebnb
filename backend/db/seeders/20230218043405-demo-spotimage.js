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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        url:'https://hensleyhomes.com/wp-content/uploads/2022/04/IMG_6215-1-1024x693.jpg',
        preview:true,
      },
      {
        spotId:2,
        url:'https://hensleyhomes.com/wp-content/uploads/2022/04/IMG_6215-1-1024x693.jpg',
        preview:true,
      },
      {
        spotId:3,
        url:'https://hensleyhomes.com/wp-content/uploads/2022/04/IMG_6215-1-1024x693.jpg',
        preview:true,
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3]
      }
    })
  }
};
