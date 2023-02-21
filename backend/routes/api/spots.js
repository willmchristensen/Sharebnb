const express = require('express');
const {Op} = require('sequelize');
const { Spot,Review,Booking,SpotImage, ReviewImage} = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const TokenExpiredError = require('jsonwebtoken/lib/TokenExpiredError');

const router = express.Router();
// TODO: most routes need
// Create a spot
router.post('/',requireAuth,handleValidationErrors, async(req,res) => {

    const {address,city,state,country,lat,lng,name,description,price} = req.body;
    // process user input

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
//      TODO:     IMPLEMENT AGGREGATE DATA, ask about what to do with preview image.
// Edit a spot by ID
router.put('/:spotId',requireAuth,handleValidationErrors, async(req,res) => {
    const {spotId} = req.params;
    const result = await Spot.findByPk(spotId);
    if(result){
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

            result.address =address ;
            result.city =city ;
            result.state =state ;
            result.country =country ;
            result.lat =lat ;
            result.lng =lng ;
            result.name =name ;
            result.description =description ;
            result.price =price ;
            result.ownerId =ownerId;
            result.avgRating = avgRating;
            result.previewImage = previewImage;

            await result.save();

        res.status(200).json(result);
    }else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
});
// TODO:
// ERRORS: 400,404,403 - Kanban
// were sending back a token right?
// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', async(req,res) => {
    const {review,stars} = req.body;
    let newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review,
        stars
    })
    res.status(200).json(newReview);
});
// TODO:
// errors: 403,404, - Kanban
// Create a Booking for a Spot based on the Spot's id
router.post('/:spotId/bookings',requireAuth,handleValidationErrors, async(req,res) => {
    const {startDate,endDate} = req.body;
    let newBooking= await Booking.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        startDate,
        endDate
    })
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
// Get all spots
router.get('/', async(req,res) => {

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

    const Spots = await Spot.findAll({
        where,
        ...pagination,
    });

    res.status(200).json({Spots,page,size});

});
// FIXME:
// ---------------------------------------------------------------------------------///
//                                     BUG
// ---------------------------------------------------------------------------------

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
// ---------------------------------------------------------------------------------
//                          ------------end of bug------------
// ------------------------------------------------------------------------------
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
    // TODO:
    // error handler
    // format userData
    res.status(200).json({Reviews,userData});
});
// Get bookings of a Spot from an id
router.get('/:spotId/bookings',requireAuth,handleValidationErrors,  async(req,res) => {
    const {spotId} = req.params;
    const Bookings = await Booking.findAll({
        where:{
            spotId:spotId
        }
    });
    // TODO:
    // implement scopes for logged in user (see Kanban)
    // FIXME:
    // --------BUG ---------
    // need to return error message if spotId does not match
    // if(Bookings){
    //     res.status(200).json(Bookings);
    // }else{
    //     res.status(400).json({
    //         "message": "Spot couldn't be found",
    //         "statusCode": 404
    //       });
    // }
     // --------BUG ---------
});
// FIXME:
// ---------------------------------------------------------------------------------///
//                                     BUG
// ---------------------------------------------------------------------------------
// Get all Spots owned by the Current User
// router.get('/:currentUserID',requireAuth,handleValidationErrors, async(req,res) => {
//     const currentUserID = req.user.id;
//     const result = await Spot.findAll({
//         where: {
//             ownerId: currentUserID
//         }
//     });
//     res.status(200).json(result);
// });
// ---------------------------------------------------------------------------------
//                          ------------end of bug------------
// ------------------------------------------------------------------------------

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
