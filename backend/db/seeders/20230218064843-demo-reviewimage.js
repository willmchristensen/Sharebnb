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
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId :1,
        url :'https://hensleyhomes.com/wp-content/uploads/2022/04/IMG_6215-1-1024x693.jpg',
      },
      {
        reviewId:2,
        url:'https://hensleyhomes.com/wp-content/uploads/2022/04/IMG_6215-1-1024x693.jpg',
      },
      {
        reviewId:3,
        url:'https://hensleyhomes.com/wp-content/uploads/2022/04/IMG_6215-1-1024x693.jpg',
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3]
      }
    })
  }
};
