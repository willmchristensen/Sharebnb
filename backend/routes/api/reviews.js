const express = require('express');
const { Review, ReviewImage, Spot} = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();

// TODO: *
// remove this entirely cuz moved into spots?
// ---------------------------------------------------------------------------------
//                              ~~~~~~       BUG        ~~~~~~
// ---------------------------------------------------------------------------------
// Create a Review for a Spot based on the Spot's id
// router.post('/:spotId', async(req,res) => {
//     const {review,stars} = req.body;
//     let newReview = await Review.create({
//         userId: req.user.id,
//         spotId: req.params.spotId,
//         review,
//         stars
//     })
//     res.status(200).json(newReview);
// });
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
//  FIXME: might need to include User model instead of grabbing from req
// TODO: im assuming we want to include the user model but not sure if grabbing from req will suffice.
// Get Reviews of Current User
router.get('/current',requireAuth,handleValidationErrors, async(req,res) => {
    if(req.user){
        let reviews = await Review.findAll({
            where:{
                userId: req.user.id
            },
            include:[
                {model: Spot},
                {model: ReviewImage},
            ],
        });
        let User = req.user;
        if(reviews){
            res.status(200).json({reviews,User});
        }else{
            res.status(404).json({message: "Reviews couldn't be found"})
        }
    }else{
        res.status(404).json({message: "User couldn't be found"})
    }
});
// TODO: 400 error for max images
// Create a Image for a Review based on the Review's id
router.post('/:reviewId/images', async(req,res) => {
    const {url} = req.body;
    let review = await Review.findByPk(req.params.reviewId);
    if(review){
        let newImage = await ReviewImage.create({
            reviewId: review.id,
            url: url
        })
        res.status(200).json(newImage);
    }else{
        res.status(404).json({message: "Review couldn't be found"})
    }
});
// TODO: DOUBLE CHECK EVERYTHING
// Get details of a review from an id
router.get('/:spotId', async(req,res) => {
    const {spotId} = req.params;
    const Review = await Review.findByPk(spotId, {
        include:{
            model: ReviewImage,
        }
    });
    res.status(200).json(Review);
});
// TODO: DOUBLE CHECK EVERYTHING
// Edit a review by ID
router.put('/:reviewId',requireAuth,handleValidationErrors, async(req,res) => {
    const {reviewId} = req.params;
    const result = await Review.findByPk(reviewId);
    if(result){
        const {review, stars} = req.body;
        // result.spotId = result.spotId;
        result.userId = req.user.id;
        result.review = review;
        result.stars = stars;
        await result.save();
        res.status(200).json(result);
        // TODO:
        // possibly change error response for body validations, specs say 400, my console said 500.
    }else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
});
// TODO: DOUBLE CHECK EVERYTHING
// Delete a review
router.delete('/:reviewId',requireAuth,handleValidationErrors, async(req,res) => {
    const {reviewId} = req.params;
    const result = await Review.findByPk(reviewId);
    if(result){
        await result.destroy()
        res.status(200).json({message: "Successfully deleted"});
    }else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
});
module.exports = router;
