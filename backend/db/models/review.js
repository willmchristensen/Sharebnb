'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Spot, {foreignKey: 'spotId', onDelete: 'CASCADE'});
      Review.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE'});
      Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId'});
    }
  }
  Review.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
