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
        address: "1739 RedWoods Lane",
        city: "Trinidad",
        state: "California",
        country: "United States",
        lat: 36.2704,
        lng: -121.8081,
        name: "Cabin Heaven",
        description: "Dream House in the Redwoods with hot tub and sauna",
        price: 535,
        previewImage: "https://a0.muscache.com/im/pictures/03d885fe-8255-4556-9b89-dca81ddef77e.jpg"
      },
      {
        id: 2,
        ownerId: 2,
        address: "456 Beach House",
        city: "Carpinteria",
        state: "California",
        country: "United States",
        lat: 35.4428,
        lng: -120.8921,
        name: "Sand",
        description: "New Beach Loft at Padero Beach. On the water in SB",
        price: 571,
        previewImage: "https://a0.muscache.com/im/pictures/62790a3f-41a1-4cbf-b27f-6122713740ad.jpg"
      },
      {
        id: 3,
        ownerId: 3,
        address: "789 Big City",
        city: "Seattle",
        state: "Washington",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Inspire",
        description: "@ Marbella Lane - Charming Capitol Hill 4BR",
        price: 546,
        previewImage: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-52861602/original/d1c9a883-1480-492f-9234-f4aafa58ec6e.jpeg"
      },
      {
        id: 4,
        ownerId: 1,
        address: "1123 West Way",
        city: "Vashon",
        state: "Washington",
        country: "United States ",
        lat: 11.7645358,
        lng: -11.4730327,
        name: "Waterfront",
        description: "Dont forget to go on hike while you spend some time exploring the beautiful scenery.",
        price: 562,
        previewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-35796478/original/fc28500d-a211-4ff2-97e9-a4bc83a9e461.jpeg"
      },
      {
        id: 5,
        ownerId: 2,
        address: "9999 North West",
        city: "Gaular",
        state: "Sogn og Fjordane",
        country: "Norway",
        lat: 11.7645358,
        lng: -11.4730327,
        name: "What!?",
        description: "Breathtaking Mountain views in cozy Birdbox",
        price: 373,
        previewImage: "https://a0.muscache.com/im/pictures/6721fc25-afe0-4f35-b181-212ec8ddc186.jpg"
      },
      {
        id: 6,
        ownerId: 2,
        address: "1123 West North",
        city: "Raray",
        state: "Hauts-de-France",
        country: "France",
        lat: 11.7645358,
        lng: -11.4730327,
        name: "Tree",
        description: "Original Spa Cabin sleeps 2 people",
        price: 373,
        previewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-16905264/original/2c06e930-ceaf-4b20-951f-a49aea1081e7.jpeg"
      },
      {
        id: 7,
        ownerId: 2,
        address: "1123 South Bay",
        city: "Boulder",
        state: "Utah",
        country: "United States of America",
        lat: 11.7645358,
        lng: -11.4730327,
        name: "How!?",
        description: "BedrocK Homestead Cave West End",
        price: 355,
        previewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-21739874/original/29aae9c7-3143-4547-8b6c-9338af02e098.jpeg"
      },
      {
        id: 8,
        ownerId: 1,
        address: "1739 RedWoods Lane",
        city: "Visalia",
        state: "California",
        country: "United States",
        lat: 36.2704,
        lng: -121.8081,
        name: "Cabin Heaven",
        description: "Dream House in the Redwoods with hot tub and sauna",
        price: 535,
        previewImage: "https://www.greenbuilt.org/images/SamselCabin4.jpg"
      },
      {
        id: 9,
        ownerId: 3,
        address: "123 Beach House",
        city: "Cayucos",
        state: "California",
        country: "United States",
        lat: 35.4428,
        lng: -120.8921,
        name: "Sand",
        description: "New Beach Loft at Padero Beach. On the water in SB",
        price: 523,
        previewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-44106940/original/66a4178c-8c97-4a18-80fb-1da7842a2f9a.jpeg"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3,4,5,6,7,8,9]
      }
    })
  }
};
