const express = require('express');
const {Op, Sequelize, sequelize} = require('sequelize');
const { Spot,Review,Booking,SpotImage, ReviewImage} = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError');

const router = express.Router();
// -----------------TODO: (most routes need ERROR HANDLERS)---------------------

// Create a spot
router.post('/',requireAuth,handleValidationErrors, async(req,res) => {

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

    res.status(201).json(newSpot)

});
// TODO: !!!!!!!!!!!check that current error message is incorrect!!!!!!!!!!!!!!!!
// TODO: avg review and preview image
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
    if(isNaN(page)) page = 0;
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
            attributes: {
                include: [
                    [sequelize.fn('AVG',sequelize.col('stars')), 'avgRating']
                ]
            }
        })

        delete spot.Reviews;

    }

    if(Spots){
        res.status(200).json({Spots,page,size});
    }

});
// TODO: owner scope?
// Get Spots of Current User
router.get('/current',requireAuth,handleValidationErrors, async(req,res) => {
    let User = req.user;
    let Spots = await Spot.findAll({
        where: {
            ownerId: User.id
        }
    })
    if(Spots){
        res.status(200).json(Spots);
    }else{
        res.status(400).json({message: "Spot couldn't be found"});
    }
});

// TODO: (previewImage & avgRating: keep in edit? still confused on what to do with these.)
// Edit a spot by ID
router.put('/:spotId',requireAuth,handleValidationErrors, async(req,res) => {
    const {spotId} = req.params;
    const Spot = await Spot.findByPk(spotId);
    if(Spot){
        const {address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            avgRating,
            previewImage,
            ownerId} = req.body;

            Spot.address =address ;
            Spot.city =city ;
            Spot.state =state ;
            Spot.country =country ;
            Spot.lat =lat ;
            Spot.lng =lng ;
            Spot.name =name ;
            Spot.description =description ;
            Spot.price =price ;
            Spot.ownerId =ownerId;
            Spot.avgRating = avgRating;
            Spot.previewImage = previewImage;

            await Spot.save();

        res.status(200).json(Spot);
    }else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
});

// TODO: (ERRORS: 400,404,403 - Kanban) && (DOUBLE CHECK: were sending back a token right?)
// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', async(req,res) => {
    const {review,stars} = req.body;
    let newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review,
        stars
    })
    // spot cant be found
    // if(){

    // }
    // // review from current user already exists
    // if(){

    // }
    res.status(200).json(newReview);
});
// TODO: (errors: 403,404, - Kanban)
// Create a Booking for a Spot based on the Spot's id
router.post('/:spotId/bookings',requireAuth,handleValidationErrors, async(req,res) => {
    const {startDate,endDate} = req.body;
    let newBooking= await Booking.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        startDate,
        endDate
    });
    res.status(200).json(newBooking);
});
// Create a SpotImage for a Spot based on the Spot's id
router.post('/:spotId/images',requireAuth,handleValidationErrors, async(req,res) => {
    const {url,preview} = req.body;
    let newSpotImage = await SpotImage.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        url,
        preview
    });
    res.status(200).json(newSpotImage);
});

// FIXME: [include associated data and aggregate data]
// Get details of a Spot from an id
router.get('/:spotId', async(req,res) => {
    const {spotId} = req.params;
    // ------HOW DO I INCLUDE PARTICULAR ITEMS------
    const result = await Spot.findByPk(spotId, {
        include:{
            all:true
            // model: SpotImage,
            // model: Review,
        }
    });
    // ------HOW DO I INCLUDE NUMBER REVIEWS------
    const numReviews = await Spot.findAndCountAll({
        include: [
            {model: Review, where: { spotId: spotId }}
        ],
    });
    console.log(numReviews.count);
    res.status(200).json({result});
});
// TODO: (error handlers) && (format userData)
// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async(req,res) => {
    const {spotId} = req.params;
    const Reviews = await Review.findAll({
        where:{
            spotId:spotId
        },
        include:{
            model: ReviewImage,
        }
    });
    let userData;
    if(req.user){
        userData = req.user;
    }
    res.status(200).json({Reviews,userData});
});
// TODO: implement scope for logged in user (see Kanban)
// Get bookings of a Spot from an id
router.get('/:spotId/bookings',requireAuth,handleValidationErrors,  async(req,res) => {
    const {spotId} = req.params;
    const spot = await Spot.findByPk(spotId,{
        include:{
            model:Booking
        }
    });
    if(spot){
        res.status(200).json(spot.Bookings);
    }else{
        res.status(404).json({message: "Spot couldn't be found"});
    }
});
// Delete a spot
router.delete('/:spotId',requireAuth,handleValidationErrors, async(req,res) => {
    const {spotId} = req.params;
    const result = await Spot.findByPk(spotId);
    if(result){
        await result.destroy()
        res.status(200).json({message: "Successfully deleted"});
    }else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
});
module.exports = router;
