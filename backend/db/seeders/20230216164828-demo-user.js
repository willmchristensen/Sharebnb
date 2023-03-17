'use strict';
const bcrypt = require("bcryptjs");
const {Op} = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'testEmail.com',
        username: 'testUserName',
        firstName: 'will',
        lastName: 'christensen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'testInfo.org',
        username: 'UserName',
        firstName: 'firstname',
        lastName: 'lastname',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'anotheremail.inc',
        username: 'AccountName',
        firstName: 'Vincent',
        lastName: 'Bob',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['testUserName', 'UserName', 'AccountName'] }
    }, {});
  }
};
