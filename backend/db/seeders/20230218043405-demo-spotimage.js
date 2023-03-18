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
        url:'https://www.greenbuilt.org/images/SamselCabin4.jpg',
        preview:false,
      },
      {
        spotId:1,
        url:'https://www.greenbuilt.org/images/SamselCabin4.jpg',
        preview:false,
      },
      {
        spotId:1,
        url:'https://www.greenbuilt.org/images/SamselCabin4.jpg',
        preview:false,
      },
      {
        spotId:1,
        url:'https://www.greenbuilt.org/images/SamselCabin4.jpg',
        preview:false,
      },
      {
        spotId:2,
        url:'https://media.architecturaldigest.com/photos/56f9add568aa959e79f353f4/master/w_5870,h_3889,c_limit/beach-houses-11.jpg',
        preview:false,
      },
      {
        spotId:2,
        url:'https://media.architecturaldigest.com/photos/56f9add568aa959e79f353f4/master/w_5870,h_3889,c_limit/beach-houses-11.jpg',
        preview:false,
      },
      {
        spotId:2,
        url:'https://media.architecturaldigest.com/photos/56f9add568aa959e79f353f4/master/w_5870,h_3889,c_limit/beach-houses-11.jpg',
        preview:false,
      },
      {
        spotId:2,
        url:'https://media.architecturaldigest.com/photos/56f9add568aa959e79f353f4/master/w_5870,h_3889,c_limit/beach-houses-11.jpg',
        preview:true,
      },
      {
        spotId:3,
        url:'https://www.urbnlivn.com/wp-content/uploads/2016/10/urbnlivn-yard-sign-800x576.jpg',
        preview:false,
      },
      {
        spotId:3,
        url:'https://www.urbnlivn.com/wp-content/uploads/2016/10/urbnlivn-yard-sign-800x576.jpg',
        preview:false,
      },
      {
        spotId:3,
        url:'https://www.urbnlivn.com/wp-content/uploads/2016/10/urbnlivn-yard-sign-800x576.jpg',
        preview:false,
      },
      {
        spotId:3,
        url:'https://www.urbnlivn.com/wp-content/uploads/2016/10/urbnlivn-yard-sign-800x576.jpg',
        preview:false,
      },
      
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
