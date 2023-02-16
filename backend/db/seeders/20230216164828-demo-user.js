'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.com',
        username: 'Demo-user',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user@demo.com',
        username: 'User-demo',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user@user.com',
        username: 'User-user',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-user', 'User-demo', 'User-user'] }
    }, {});
  }
};
