const express = require('express');
const { Review, ReviewImage, Spot, User} = require('../../db/models');
const validator = require('validator');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();

// TODO: DOUBLE CHECK EVERYTHING
// Get Reviews of Current User
router.get('/current',requireAuth,handleValidationErrors, async(req,res) => {
    const Reviews = await Review.findAll({
        where:{
            userId: req.user.id
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
                }
            },
            {
                model: Spot,
                attributes: {
                    exclude: [
                    "description",
                    "avgRating",
                    "createdAt",
                    "updatedAt"]
                }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: [
                    "reviewId",
                    "createdAt",
                    "updatedAt"]
                }
            },
        ],
    });
    if(!Reviews){
        return res.status(404).json({
            message: "Reviews couldn't be found",
            statusCode: 404
        });
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
    if(!review){
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    }else if(review.ReviewImages.length === 10){
            return res.status(403).json({
                message: "Maximum number of images for this resource was reached",
                statusCode: 403
            });
        }else{
            let newImage = await ReviewImage.create({
                reviewId: review.id,
                url: url
            })
            return res.status(200).json(newImage);
        }
});
// TODO: DOUBLE CHECK EVERYTHING
// Edit a review by ID
router.put('/:reviewId',requireAuth,handleValidationErrors, async(req,res) => {
    const {reviewId} = req.params;
    const editedReview = await Review.findOne({
        where: {
            id: reviewId,
        }
    });
    if(!editedReview){
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode:404
        });
    }else if(editedReview.userId !== req.user.id){
        return res.status(403).json({
            message: "Review must belong to the current user",
            statusCode: 403
        });
    }else{
        const {review, stars} = req.body;
        let validReview = (typeof review === 'string' && review.length > 0);
        let validStars = (typeof stars === 'number');
        if(validReview && validStars){
            editedReview.userId = req.user.id;
            editedReview.review = review;
            editedReview.stars = stars;
            await editedReview.save();

            return res.status(200).json(editedReview);
        }else if(!validReview){
            return res.status(400).json({
                message: "Review text is required",
                statusCode:400
            });
        }else{
            return res.status(400).json({
                message: "Stars must be an integer from 1 to 5",
                statusCode:400
            });
        }
    }
});
// TODO: DOUBLE CHECK EVERYTHING
// Delete a review
router.delete('/:reviewId',requireAuth,handleValidationErrors, async(req,res) => {
    const {reviewId} = req.params;
    const review = await Review.findOne({
        where:{
            id:reviewId,
        }
    });
    if(!review){
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    }else if(review.userId !== req.user.id){
        return res.status(403).json({
            message: "Review must belong to the current user",
            statusCode: 403
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
