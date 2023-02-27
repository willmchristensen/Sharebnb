const express = require('express');
const {Op, Sequelize} = require('sequelize');
const {Spot,Review,Booking,SpotImage,ReviewImage,User} = require('../../db/models');
const validator = require('validator');
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
    check('lat')
      .isFloat({min:-90, max: 90})
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Longitude is required'),
    check('lng')
      .isFloat({min:-180, max: 180})
      .withMessage('Longitude is not valid'),
    check('name')
      .isLength({max: 50})
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

    await Spot.create({
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

    const newSpot =  await Spot.findOne({
        where: {
            address:address,
            city:city,
            state:state,
            country:country,
            lat:lat,
            lng:lng,
            name:name,
            description:description,
            price:price,
            ownerId: req.user.id
        },
        attributes :{ exclude: ["previewImage", "avgRating"] }
    });

    return res.status(201).json(newSpot)

});
// TODO:DOUBLE CHECK EVERYTHING
// Get all spots
router.get('/', async(req,res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    let where = {};
    let errors = {};

    if(page < 1) errors.page = "Page must be greater than or equal to 1"
    if(size < 1) errors.size = "Size must be greater than or equal to 1"

    if(minLat && (minLat > 90 || minLat < -90)) errors.minLat = "Minimum latitude is invalid"
    else if(minLat) where.lat = { [Op.gte]: minLat }

    if(maxLat && (maxLat > 90 || maxLat < -90)) errors.maxLat = "Maximum latitude is invalid"
    else if(maxLat) where.lat = { [Op.lte]: maxLat }

    if(minLng && (minLng > 180 || minLng < -180) ) errors.minLng = "Minimum longitude is invalid"
    else if(minLng) where.lng = { [Op.gte]: minLng }

    if(maxLng && (minLng > 180 || minLng < -180) ) errors.maxLng = "Minimum longitude is invalid"
    else if(maxLng) where.lng = { [Op.lte]: maxLng }

    if(minPrice && minPrice < 0) errors.minPrice = "Minimum price must be greater than or equal to 0"
    else if(minPrice) where.price = { [Op.gte]: minPrice }

    if(maxPrice && maxPrice < 0) errors.maxPrice = "Maximum price must be greater than or equal to 0"
    else if(maxPrice) where.price = { [Op.lte]: maxPrice }

    if(Object.keys(errors).length){
        return res.status(400).json({
            message: 'Validation Error',
            statusCode: 400,
            errors
        });
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

    return res.status(200).json({Spots,page,size});

});
// TODO:DOUBLE CHECK EVERYTHING
// Get Spots of Current User
router.get('/current',requireAuth, async(req,res) => {
    let Spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    });
    if(Spots){
        return res.status(200).json({Spots});
    }else{
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }
});
// TODO:DOUBLE CHECK EVERYTHING
// Edit a spot by ID
router.put('/:spotId',requireAuth,validateSpot, async(req,res) => {
    let spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        }
    });
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }else if(spot.ownerId !== req.user.id){
        return res.status(403).json({
            message: "Spot must belong to the current user",
            statusCode: 403
        });
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


            const revisedSpot =  await Spot.findOne({
                where: {
                    address:address,
                    city:city,
                    state:state,
                    country:country,
                    lat:lat,
                    lng:lng,
                    name:name,
                    description:description,
                    price:price,
                    ownerId: req.user.id
                },
                attributes :{ exclude: ["previewImage", "avgRating"] }
            });

        return res.status(200).json(revisedSpot);
    }
});
// TODO:DOUBLE CHECK EVERYTHING
// Create a Review for a Spot based on the Spot's id
const validateReview = [
    check('review')
        .exists({checkFalsy: true})
        .withMessage("Review text is required"),
    check('stars')
        .exists({checkFalsy: true})
        .isInt({min: 1, max: 5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];
router.post('/:spotId/reviews',requireAuth,validateReview, async(req,res) => {
    const {review,stars} = req.body;
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
        return res.status(403).json({
            message: "User already has a review for this spot",
            statusCode: 403
        });
    }else if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }else if(spot.ownerId === req.user.id){
        return res.status(403).json({
            message: "Spot must not belong to the current user",
            statusCode: 403
        });
    }else{
        let newReview = await Review.create({
            userId: req.user.id,
            spotId: parseInt(spotId),
            review,
            stars
        });
            return res.status(200).json(newReview);
    }
});
// TODO:DOUBLE CHECK EVERYTHING
// Create a Booking for a Spot based on the Spot's id
const validateBooking = [
    check('startDate')
        .exists({checkFalsy: true})
        .withMessage("StartDate is required"),
    check('endDate')
        .exists({checkFalsy: true})
        .withMessage("EndDate is required"),
    handleValidationErrors
];
router.post('/:spotId/bookings',requireAuth,validateBooking, async(req,res) => {
    const {spotId} = req.params;
    const {startDate,endDate} = req.body;
    const spot = await Spot.findByPk(spotId);

    let startTime = new Date(startDate).getTime();
    let endTime = new Date(endDate).getTime();

    if(endTime < startTime){
        return res.status(400).json({
            message: "endDate cannot be on or before startDate",
            statusCode: 400
        });
    }else if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }else if(spot.ownerId === req.user.id){
        return res.status(403).json({
            message: "Spot must not belong to the current user",
            statusCode: 403
        });
    }else{
        const bookings = await Booking.findAll({
            where:{
                spotId: spotId,
            }
        });
        let errors = {};
        for(let i = 0; i < bookings.length; i++){
            let booking = bookings[i];
            let start = booking.startDate;
            let end = booking.endDate;
            let scheduledStart = new Date(start).getTime();
            let scheduledEnd = new Date(end).getTime();

            let startConflict = startTime >= scheduledStart && startTime <= scheduledEnd;
            let endConflict = endTime >= scheduledStart && endTime <= scheduledEnd;


            if(startConflict){
                errors.startDate = "Start date conflicts with an existing booking"
            }

            if(endConflict){
                errors.endDate = "End date conflicts with an existing booking"
            }
        }
        if(Object.keys(errors).length){
            return res.status(403).json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403,
                errors
            });
        }else{
            let newBooking = await Booking.create({
                userId: req.user.id,
                spotId: parseInt(spotId),
                startDate,
                endDate
            });

            return res.status(200).json(newBooking);
        }
    }
});
// TODO: DOUBLE CHECK EVERYTHING -- implement max images
// Create a SpotImage for a Spot based on the Spot's id
const validateImage = [
    check('url')
        .exists({checkFalsy: true})
        .withMessage("Url is required"),
    check('preview')
        .exists({checkFalsy: true})
        .withMessage("Preview is required"),
    handleValidationErrors
];
router.post('/:spotId/images',requireAuth,validateImage, async(req,res) => {
    const {url,preview} = req.body;

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        }
    });

    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }else if(spot.ownerId !== req.user.id){
        return res.status(403).json({
            message: "Spot must belong to the current user",
            statusCode: 403
        });
    }else{
        await SpotImage.create({
            spotId: parseInt(req.params.spotId),
            url,
            preview
        });

        let newSpotImage = await SpotImage.findOne({
            where: {
                spotId: parseInt(req.params.spotId),
                url: url,
                preview: preview
            },
            attributes : ["id","url", "preview"]
        });

        return res.status(200).json(newSpotImage);
    }
});
// TODO:DOUBLE CHECK EVERYTHING
// Get details of a Spot from an id
router.get('/:spotId', async(req,res) => {
    const {spotId} = req.params;
    const spot = await Spot.findByPk(spotId, {
        attributes:{
            exclude: ["avgRating", "previewImage"]
        },
        include:[
            {
                model: SpotImage,
                attributes: {
                    exclude:
                    [
                        "spotId",
                        "createdAt",
                        "updatedAt",
                    ]
                }
            },
            {
                model: User ,
                as: "Owner",
                attributes:
                [
                    "id",
                    "firstName",
                    "lastName"
                ]
            },
        ]
    });
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
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
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }else{
        const Reviews = await Review.findAll({
            where:{
                spotId:spotId
            },
            include:[
                {
                    model: User,
                     attributes: {
                    exclude: [ "username",
                    "email",
                    "hashedPassword",
                    "createdAt",
                    "updatedAt"]
                }},
                {
                    model: ReviewImage,
                     attributes: {
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
router.get('/:spotId/bookings',requireAuth, async(req,res) => {

    const {spotId} = req.params;
    const ownerInfo = await Spot.findByPk(spotId);
    if(!ownerInfo){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }else{
        let spotOwnerId = ownerInfo.ownerId;
        let userId = req.user.id;
        if(spotOwnerId === userId){
            const Bookings = await Booking.findAll({
                where:{
                    spotId:spotId
                },
                include:[
                    {
                        model: User,
                        attributes: {
                            exclude:
                            [
                                "username",
                                "email",
                                "hashedPassword",
                                "createdAt",
                                "updatedAt"
                            ]
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
                        exclude:
                        [
                            "id",
                            "userId",
                            "createdAt",
                            "updatedAt"
                        ]
                    }
                });
                return res.status(200).json({Bookings});
            }
        }
});
// TODO:DOUBLE CHECK EVERYTHING
// Delete a spot
router.delete('/:spotId',requireAuth, async(req,res) => {
    let spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        }
    });
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }else if(spot.ownerId !== req.user.id){
        return res.status(403).json({
            message: "Spot must belong to the current user",
            statusCode: 403
        });
    }else{
        await spot.destroy()
        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        });
    }
});
module.exports = router;
