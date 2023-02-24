const express = require('express');
const {Op, Sequelize} = require('sequelize');
const { Spot,Review,Booking,SpotImage, ReviewImage, User} = require('../../db/models');
const validator = require('validator');
const moment = require('moment');
const { check } = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError');

const router = express.Router();


const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Latitude is required'),
    check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Longitude is required'),
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Description is required'),
    check('price')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('"Price per day is required"'),
    handleValidationErrors
];
// TODO: DOUBLE CHECK EVERYTHING
// Create a spot
router.post('/',requireAuth,validateSpot, async(req,res) => {

    const {address,city,state,country,lat,lng,name,description,price} = req.body;

    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: req.user.id
    });



    return res.status(201).json(newSpot)

});
// TODO:DOUBLE CHECK EVERYTHING
// Get all spots
router.get('/',handleValidationErrors, async(req,res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    let where = {};

    if(minLat){
        where.lat = { [Op.gte]: minLat }
    }
    if(maxLat){
        where.lat = { [Op.lte]: maxLat }
    }
    if(minLng){
        where.lng = { [Op.gte]: minLng }
    }
    if(maxLng){
        where.lng = { [Op.lte]: maxLng }
    }
    if(minPrice){
        where.price = { [Op.gte]: minPrice }
    }
    if(maxPrice){
        where.price = { [Op.lte]: maxPrice }
    }

    let pagination = {};
    page = parseInt(page);
    size = parseInt(size);
    if(isNaN(page)) page = 1;
    if(isNaN(size)) size = 20;
    if (page > 10) page = 10
    if (size > 20) size = 20
    pagination.limit = size;
    pagination.offset = size * (page - 1)

    const allSpots = await Spot.findAll({
        where,
        include:[
            {model: Review},
            {model: SpotImage},
        ],
        ...pagination,
    });

    const Spots = [];

    for(let i = 0; i < allSpots.length; i++){
        let spot = allSpots[i];
        Spots.push(spot.toJSON());
    }

    for(let i = 0; i < Spots.length; i++){

        let spot = Spots[i];

        if(spot.SpotImages.length > 0){
            for(let j = 0; j < spot.SpotImages.length; j++){
                const spotImage = spot.SpotImages[j];
                if(spotImage.preview){
                    spot.previewImage = spotImage.url;
                }
            }
        }
        delete spot.SpotImages;


        let reviewData = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [Sequelize.fn('AVG',Sequelize.col('stars')), 'avgRating']
            ]
        })

        spot.avgRating = reviewData.toJSON().avgRating;

        delete spot.Reviews;

    }

    if(Spots){
        return res.status(200).json({Spots,page,size});
    }

});
// TODO:DOUBLE CHECK EVERYTHING
// Get Spots of Current User
router.get('/current',requireAuth,handleValidationErrors, async(req,res) => {
    let Spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })
    if(Spots){
        res.status(200).json({Spots});
    }else{
        res.status(400).json({message: "Spot couldn't be found"});
    }
});
// TODO:DOUBLE CHECK EVERYTHING
// Edit a spot by ID
router.put('/:spotId',requireAuth,handleValidationErrors,validateSpot, async(req,res) => {
    let spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    });
    // return res.json(spot);
    if(!spot){
        res.status(404).json({message: "Spot couldn't be found"})
    }else{
        const {address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price} = req.body;

            spot.address =address ;
            spot.city =city ;
            spot.state =state ;
            spot.country =country ;
            spot.lat =lat ;
            spot.lng =lng ;
            spot.name =name ;
            spot.description =description ;
            spot.price =price ;

            await spot.save();

            spot = spot.toJSON();
            delete spot.avgRating;
            delete spot.previewImage;

        return res.status(200).json(spot);
    }
});
// TODO:DOUBLE CHECK EVERYTHING
// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews',requireAuth,handleValidationErrors, async(req,res) => {
    const {spotId} = req.params;
    let currentUser = req.user.id;

    const spot = await Spot.findByPk(spotId);
    const reviewed = await Review.findOne({
        where:{
            spotId: spotId,
            userId: currentUser,
        }
    });

    if(reviewed){
        return res.status(403).json({message: "User already has a review for this spot"});
    }else if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"});
    }else{
        const {review,stars} = req.body;

        let validReview = (typeof review === 'string' && review.length > 0);
        let validStars = (typeof stars === 'number');

        if(validReview && validStars){
            let newReview = await Review.create({
                userId: req.user.id,
                spotId: parseInt(spotId),
                review,
                stars
            });
            return res.status(200).json(newReview);
        }else if(!validReview){
            return res.status(400).json({message: "Review text is required"});
        }else{
            return res.status(400).json({message: "Stars must be an integer from 1 to 5"});
        }

    }
});
// TODO:DOUBLE CHECK EVERYTHING
// TODO: handle invalid dates?
// Create a Booking for a Spot based on the Spot's id
router.post('/:spotId/bookings',requireAuth,handleValidationErrors, async(req,res) => {
    const {spotId} = req.params;
    let {startDate,endDate} = req.body;

    let startTime = new Date(startDate).getTime();
    let endTime = new Date(endDate).getTime();

    if(endTime < startTime){
        return res.status(400).json({message: "endDate cannot be on or before startDate"});
    }

    const spot = await Spot.findByPk(spotId);

    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"})
    }else{

        const bookings = await Booking.findAll({
            where:{
                spotId: spotId,
            }
        });

        for(let i = 0; i < bookings.length; i++){
            let booking = bookings[i];
            let start = booking.startDate;
            let end = booking.endDate;
            let scheduledStart = new Date(start).getTime();
            let scheduledEnd = new Date(end).getTime();

            let startConflict = moment(startDate).isBetween(scheduledStart,scheduledEnd);
            let endConflict = moment(endDate).isBetween(scheduledStart,scheduledEnd);

            if(startConflict){
                return res.status(403).json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    errors:"Start date conflicts with an existing booking"
                });
            }else if(endConflict){
                return res.status(403).json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    errors:"End date conflicts with an existing booking"
                });
            }
        }

        let newBooking = await Booking.create({
            userId: req.user.id,
            spotId: parseInt(spotId),
            startDate,
            endDate
        });

        return res.status(200).json(newBooking);
    }
});
// TODO:DOUBLE CHECK EVERYTHING
// Create a SpotImage for a Spot based on the Spot's id
router.post('/:spotId/images',requireAuth,handleValidationErrors, async(req,res) => {
    const {url,preview} = req.body;

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    });

    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"})
    }else{
        let newSpotImage = await SpotImage.create({
            userId: req.user.id,
            spotId: parseInt(req.params.spotId),
            url,
            preview
        });
        newSpotImage = newSpotImage.toJSON();
        delete newSpotImage.updatedAt
        delete newSpotImage.createdAt
        delete newSpotImage.spotId

        return res.status(200).json(newSpotImage);
    }
});


// TODO:DOUBLE CHECK EVERYTHING
// FIXME: include associated data and aggregate data before spotImages/Owner?
// Get details of a Spot from an id
router.get('/:spotId', async(req,res) => {
    const {spotId} = req.params;
    const spot = await Spot.findByPk(spotId, {
        include:[
            {
                model: SpotImage,
                attributes: {
                    exclude: [
                    "spotId",
                    "createdAt",
                    "updatedAt",]
                }
            },
            {model: User , as: 'Owner'},
        ]
    });
    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"})
    }else{
        let spotObj = spot.toJSON();

        let reviewData = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [Sequelize.fn('COUNT',Sequelize.col('id')), 'numReviews'],
                [Sequelize.fn('AVG',Sequelize.col('stars')), 'avgStarRating']
            ]
        });

        delete spotObj.avgRating;
        spotObj.numReviews = reviewData.toJSON().numReviews;
        spotObj.avgStarRating = reviewData.toJSON().avgStarRating;

        return res.status(200).json(spotObj);
    }
});


// TODO:DOUBLE CHECK EVERYTHING
// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async(req,res) => {
    const {spotId} = req.params;
    const result = await Spot.findByPk(spotId);
    if(!result){
        return res.status(404).json({message: "Spot couldn't be found"})
    }else{
        const Reviews = await Review.findAll({
            where:{
                spotId:spotId
            },
            include:[
                {model: User, attributes: {
                    exclude: [ "username",
                    "email",
                    "hashedPassword",
                    "createdAt",
                    "updatedAt"]
                }},
                {model: ReviewImage, attributes: {
                    exclude: [ "createdAt",
                    "updatedAt", "reviewId"]
                }},
            ]
        });

        return res.status(200).json({Reviews});

    }
});
// TODO:DOUBLE CHECK EVERYTHING
// Get all bookings of a Spot from an id
router.get('/:spotId/bookings',requireAuth,handleValidationErrors,  async(req,res) => {

    const {spotId} = req.params;
    const ownerInfo = await Spot.findByPk(spotId);
    if(!ownerInfo){
        return res.status(404).json({message: "Spot couldn't be found"})
    }else{
        let spotOwnerId = ownerInfo.ownerId;
        let userId = req.user.id;
        if(spotOwnerId === userId){
            const Bookings = await Booking.findAll({
                where:{
                    spotId:spotId
                },
                include:[
                    {model: User, attributes: {
                        exclude: [ "username",
                    "email",
                    "hashedPassword",
                    "createdAt",
                    "updatedAt"]
                    }},
                ]
            });
                return res.status(200).json({Bookings});
            }else{
                const Bookings = await Booking.findAll({
                    where:{
                        spotId:spotId
                    },
                    attributes: {
                        exclude: [
                            "id",
                            "userId",
                        "createdAt",
                        "updatedAt"]
                    }
                });
                return res.status(200).json({Bookings});
            }
        }
        // return res.status(200).json({Bookings});
});

// TODO:DOUBLE CHECK EVERYTHING
// Delete a spot
router.delete('/:spotId',requireAuth,handleValidationErrors, async(req,res) => {
    let spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    });
    if(spot){
        await result.destroy()
        res.status(200).json({message: "Successfully deleted"});
    }else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
});
module.exports = router;
