const express = require('express');
const { Review, ReviewImage, Spot, User} = require('../../db/models');
const validator = require('validator');
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
// TODO: DOUBLE CHECK EVERYTHING
// Get Reviews of Current User
router.get('/current',requireAuth,handleValidationErrors, async(req,res) => {

    const Reviews = await Review.findAll({
        where:{
            userId: req.user.id
        },
        include:[
            {model: User, attributes: {
                exclude: [ "username",
                "email",
                "hashedPassword",
                "createdAt",
                "updatedAt"]
            }},
            {model: Spot, attributes: {
                exclude: [
                "description",
                "avgRating",
                "createdAt",
                "updatedAt",]
            }},
            {
                model: ReviewImage,
                attributes: {
                    exclude: [
                    "reviewId",
                    "createdAt",
                    "updatedAt",]
                }
            },
        ],
    });
    if(!Reviews){
        return res.status(404).json({message: "Reviews couldn't be found"})
    }else{
        return res.status(200).json({Reviews});
    }
});
// TODO: DOUBLE CHECK EVERYTHING
// Create a Image for a Review based on the Review's id
router.post('/:reviewId/images', async(req,res) => {
    const {url} = req.body;
    const reviewId = req.params.reviewId;
    let review = await Review.findOne({
        where:{
            id: reviewId,
            userId: req.user.id
        },
        include: {
            model: ReviewImage,
        }
    });
    // return res.json({review});
    if(!review){
        return res.status(404).json({message: "Review couldn't be found"})
    }else if(review.ReviewImages.length === 10){
            return res.status(403).json({message: "Maximum number of images for this resource was reached"});
        }else{
            let newImage = await ReviewImage.create({
                reviewId: review.id,
                url: url
            })
            return res.status(200).json(newImage);
        }
});


// --------------------------------------------------------------------
// FIXME: what is this doing here? i dont think neccessary
// TODO: DOUBLE CHECK EVERYTHING
// Get details of a review from an id
// router.get('/:spotId', async(req,res) => {
//     const {spotId} = req.params;
//     const Review = await Review.findByPk(spotId, {
//         include:{
//             model: ReviewImage,
//         }
//     });
//     res.status(200).json(Review);
// });
// --------------------------------------------------------------------
// TODO: DOUBLE CHECK EVERYTHING

// TODO: VALIDATOR & **test editing a review that does not belong to current user**
// Edit a review by ID
router.put('/:reviewId',requireAuth,handleValidationErrors, async(req,res) => {
    const {reviewId} = req.params;
    const result = await Review.findByPk(reviewId,{
        where: {
            userId: req.user.id
        }
    });
    if(result){
        const {review, stars} = req.body;
        let validReview = (typeof review === 'string' && review.length > 0);
        let validStars = (typeof stars === 'number');
        if(validReview && validStars){
            result.userId = req.user.id;
            result.review = review;
            result.stars = stars;
            await result.save();

            return res.status(200).json(result);
        }else if(!validReview){
            return res.status(400).json({message: "Review text is required"});
        }else{
            return res.status(400).json({message: "Stars must be an integer from 1 to 5"});
        }
    }else{
        return res.status(404).json({message: "Review couldn't be found"});
    }
});
// TODO: DOUBLE CHECK EVERYTHING
// Delete a review
router.delete('/:reviewId',requireAuth,handleValidationErrors, async(req,res) => {
    const {reviewId} = req.params;
    const review = await Review.findByPk(reviewId);
    if(!review){
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    }else if(review.userId !== req.user.id){
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    }else{
        await review.destroy()
        res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        });
    }
});
module.exports = router;
