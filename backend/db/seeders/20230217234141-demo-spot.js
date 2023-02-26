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
        city: "Big Sur",
        state: "California",
        country: "United States of America",
        lat: 36.2704,
        lng: -121.8081,
        name: "Cabby by the Beachy",
        description: "Where the wild things are",
        price: 123,
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
