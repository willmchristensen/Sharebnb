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
        review:'The fanciest place i have ever seen in my life',
        stars:5
      },
      {
        spotId:2,
        userId:2,
        review:'Definitely, comfiest place i have ever been in my life Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, deserunt!',
        stars:4.1
      },
      {
        spotId:3,
        userId:3,
        review:'Not my slice of pie. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, sit!',
        stars:4.3
      },
      {
        spotId:4,
        userId:4,
        review:'Probably the nicest place i have ever seen in my life Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde, hic.',
        stars:4
      },
      {
        spotId:5,
        userId:4,
        review:'The coziest place i have ever seen in my lifeLorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, provident.',
        stars:4
      },
      {
        spotId:6,
        userId:4,
        review:'The nicest place i have ever seen in my life Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, ut?' ,
        stars:4
      },
      {
        spotId:7,
        userId:4,
        review:'The nicest place i have ever seen in my life Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, corporis!' ,
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
