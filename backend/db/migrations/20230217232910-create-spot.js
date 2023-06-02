'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async(queryInterface, Sequelize) => {
    return queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users'},
        onDelete: 'CASCADE',
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lat: {
        type: Sequelize.DECIMAL
      },
      lng: {
        type: Sequelize.DECIMAL
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      avgRating: {
        type: Sequelize.DECIMAL,
        defaultValue: 0.0,
      },
      previewImage:{
        type: Sequelize.STRING,
        defaultValue: null,
      }
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, null, {});
  }
};
