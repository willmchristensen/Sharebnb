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
    return queryInterface.bulkInsert(options, 
    [
      {
        spotId:1,
        url:'https://www.greenbuilt.org/images/SamselCabin4.jpg',
        preview: true,
      },
      {
        spotId:1,
        url:'https://a0.muscache.com/im/pictures/5cc0abe4-8eb5-4fc6-b06d-f881e28d17bb.jpg',
        preview:false,
      },
      {
        spotId:1,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-36198980/original/85ba9f30-b1c5-4ace-9901-a55222862165.jpeg',
        preview:false,
      },
      {
        spotId:1,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-36198980/original/83ac2a7f-e9a1-4b56-9e2b-89303a4a55c6.jpeg',
        preview:false,
      },
      {
        spotId:1,
        url:'https://a0.muscache.com/im/pictures/b35816f0-1b23-4d93-bedc-a67da2c53324.jpg',
        preview:false,
      },
      {
        spotId:2,
        url:'https://a0.muscache.com/im/pictures/62790a3f-41a1-4cbf-b27f-6122713740ad.jpg',
        preview: true,
      },
      {
        spotId:2,
        url:'https://a0.muscache.com/im/pictures/b6580942-5a6e-452e-bba5-c619a7e960ce.jpg',
        preview:false,
      },
      {
        spotId:2,
        url:'https://a0.muscache.com/im/pictures/17767f80-b37d-428d-a056-5154f49d7b36.jpg',
        preview:false,
      },
      {
        spotId:2,
        url:'https://a0.muscache.com/im/pictures/ab6f7fa7-c946-42f5-876f-ee62325476b9.jpg',
        preview:false,
      },
      {
        spotId:2,
        url:'https://a0.muscache.com/im/pictures/2eb98f26-a348-42cf-bd04-acdf9a51a403.jpg',
        preview:true,
      },
      {
        spotId:3,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52861602/original/d1c9a883-1480-492f-9234-f4aafa58ec6e.jpeg',
        preview: true,
      },
      {
        spotId:3,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52861602/original/50542031-48ae-4038-b021-d17f371ec34f.jpeg',
        preview:false,
      },
      {
        spotId:3,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52861602/original/c6e845a1-4267-412b-8a5e-85bda633b811.jpeg',
        preview:false,
      },
      {
        spotId:3,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52861602/original/d91c8174-d181-4474-98fd-c297c8dbb2df.jpeg',
        preview:false,
      },
      {
        spotId:3,
        url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52861602/original/fda7995f-2571-4cc2-a2da-bbddd9fea1f1.jpeg',
        preview:false,
      },
      {
        spotId:4,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-35796478/original/fc28500d-a211-4ff2-97e9-a4bc83a9e461.jpeg',
        preview: true,
      },
      {
        spotId:4,
        url:'https://a0.muscache.com/im/pictures/8af2d2bf-d879-4afa-a6df-f918077f693a.jpg',
        preview:false,
      },
      {
        spotId:4,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-35796478/original/af862e66-4317-438a-a32d-68dee658c787.jpeg',
        preview:false,
      },
      {
        spotId:4,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-35796478/original/e8ad737a-79bf-4849-bb72-8d40ae8826fb.jpeg',
        preview:false,
      },
      {
        spotId:4,
        url:'https://a0.muscache.com/im/pictures/17442b97-34fd-4580-80cf-94d1010f388e.jpg',
        preview:false,
      },
      {
        spotId:5,
        url:'https://a0.muscache.com/im/pictures/6721fc25-afe0-4f35-b181-212ec8ddc186.jpg',
        preview: true,
      },
      {
        spotId:5,
        url:'https://a0.muscache.com/im/pictures/7a7f8828-57cc-4fa5-b7ff-ae06bf8409a9.jpg',
        preview:false,
      },
      {
        spotId:5,
        url:'https://a0.muscache.com/im/pictures/4568c35b-bb8c-4367-b828-8f17bcea5934.jpg',
        preview:false,
      },
      {
        spotId:5,
        url:'https://a0.muscache.com/im/pictures/23a60113-a16d-4cd6-bf5a-a2f352eb4f4e.jpg',
        preview:false,
      },
      {
        spotId:5,
        url:'https://a0.muscache.com/im/pictures/1d22ab4c-641d-47d6-89fd-7c0418274ce7.jpg',
        preview:false,
      },
      {
        spotId:6,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-16905264/original/2c06e930-ceaf-4b20-951f-a49aea1081e7.jpeg',
        preview: true,
      },
      {
        spotId:6,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-16905264/original/77492d9e-9ed7-4234-b9fe-aa397c608215.jpeg',
        preview:false,
      },
      {
        spotId:6,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-16905264/original/3cad0af1-1a7f-4b43-969d-640437be8b0a.jpeg',
        preview:false,
      },
      {
        spotId:6,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-16905264/original/15591c4e-7a1c-43f6-b4e3-aebd28b23fb8.jpeg',
        preview:false,
      },
      {
        spotId:6,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-16905264/original/2c06e930-ceaf-4b20-951f-a49aea1081e7.jpeg',
        preview:false,
      },
      {
        spotId:7,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-21739874/original/29aae9c7-3143-4547-8b6c-9338af02e098.jpeg',
        preview: true,
      },
      {
        spotId:7,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-21739874/original/5ef235c4-8534-441a-973f-4491ad396eec.jpeg',
        preview:false,
      },
      {
        spotId:7,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-21739874/original/9b3bc6a4-9f60-45ec-b493-2c61caf53a0d.jpeg',
        preview:false,
      },
      {
        spotId:7,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-21739874/original/111aa8af-9bb6-4443-8884-b312be88b353.jpeg',
        preview:false,
      },
      {
        spotId:7,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-21739874/original/5ef235c4-8534-441a-973f-4491ad396eec.jpeg',
        preview:false,
      },
      {
        spotId:8,
        url:'https://www.greenbuilt.org/images/SamselCabin4.jpg',
        preview: true,
      },
      {
        spotId:8,
        url:'https://a0.muscache.com/im/pictures/5cc0abe4-8eb5-4fc6-b06d-f881e28d17bb.jpg',
        preview:false,
      },
      {
        spotId:8,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-36198980/original/85ba9f30-b1c5-4ace-9901-a55222862165.jpeg',
        preview:false,
      },
      {
        spotId:8,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-36198980/original/83ac2a7f-e9a1-4b56-9e2b-89303a4a55c6.jpeg',
        preview:false,
      },
      {
        spotId:8,
        url:'https://a0.muscache.com/im/pictures/b35816f0-1b23-4d93-bedc-a67da2c53324.jpg',
        preview:false,
      },
      {
        spotId:9,
        url:'https://a0.muscache.com/im/pictures/62790a3f-41a1-4cbf-b27f-6122713740ad.jpg',
        preview: true,
      },
      {
        spotId:9,
        url:'https://a0.muscache.com/im/pictures/b6580942-5a6e-452e-bba5-c619a7e960ce.jpg',
        preview:false,
      },
      {
        spotId:9,
        url:'https://a0.muscache.com/im/pictures/17767f80-b37d-428d-a056-5154f49d7b36.jpg',
        preview:false,
      },
      {
        spotId:9,
        url:'https://a0.muscache.com/im/pictures/ab6f7fa7-c946-42f5-876f-ee62325476b9.jpg',
        preview:false,
      },
      {
        spotId:9,
        url:'https://a0.muscache.com/im/pictures/2eb98f26-a348-42cf-bd04-acdf9a51a403.jpg',
        preview:true,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1,2,3,4,5,6,7]
      }
    })
  }
};
