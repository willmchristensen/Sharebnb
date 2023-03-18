'use strict';
const bcrypt = require("bcryptjs");
const {Op} = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        ownerId: 1,
        address: "123 Cabin Woods",
        city: "Cabin City",
        state: "California",
        country: "United States of America",
        lat: 36.2704,
        lng: -121.8081,
        name: "Cabin Heaven",
        description: "Where the cabin things are",
        price: 123,
        previewImage: "https://www.greenbuilt.org/images/SamselCabin4.jpg"
      },
      {
        id: 2,
        ownerId: 2,
        address: "456 Beach House",
        city: "Cayucos",
        state: "California",
        country: "United States of America",
        lat: 35.4428,
        lng: -120.8921,
        name: "Sandy",
        description: "Sally sells seashells here",
        price: 200,
        previewImage: "https://media.architecturaldigest.com/photos/56f9add568aa959e79f353f4/master/w_5870,h_3889,c_limit/beach-houses-11.jpg"
      },
      {
        id: 3,
        ownerId: 3,
        address: "789 Big City",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Rainy",
        description: "It rains here",
        price: 999,
        previewImage: "https://www.urbnlivn.com/wp-content/uploads/2016/10/urbnlivn-yard-sign-800x576.jpg"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3]
      }
    })
  }
};
