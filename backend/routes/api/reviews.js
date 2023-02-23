const express = require('express');
const { Review, ReviewImage, Spot, User} = require('../../db/models');
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
    if(req.user){
        let reviews = await Review.findAll({
            where:{
                userId: req.user.id
            },
            include:[
                {model: User},
                {model: Spot},
                {model: ReviewImage},
            ],
        });
        if(reviews){
            res.status(200).json({reviews});
        }else{
            res.status(404).json({message: "Reviews couldn't be found"})
        }
    }else{
        res.status(404).json({message: "User couldn't be found"})
    }
});
// TODO: DOUBLE CHECK EVERYTHING
// Create a Image for a Review based on the Review's id
router.post('/:reviewId/images', async(req,res) => {
    const {url} = req.body;
    let review = await Review.findByPk(req.params.reviewId, {
        include: {
            model: ReviewImage,
        }
    });
    if(review.ReviewImages.length === 10){
        return res.status(403).json({message: "Maximum number of images for this resource was reached"});
    }
    if(review){
        let newImage = await ReviewImage.create({
            reviewId: review.id,
            url: url
        })
        return res.status(200).json(newImage);
    }else{
        return res.status(404).json({message: "Review couldn't be found"})
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

// TODO: VALIDATOR & ensure user check is working
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
        // result.spotId = result.spotId;
        result.userId = req.user.id;
        result.review = review;
        result.stars = stars;
        await result.save();

        res.status(200).json(result);
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
