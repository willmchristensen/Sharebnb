const express = require('express');
const { Review, ReviewImage } = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();

// Create a Image for a Review based on the Review's id
router.post('/:reviewId/images', async(req,res) => {
    const {url} = req.body;
    let newReview = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url: url
    })
    res.status(200).json(newReview);
});
// Get details of a review from an id
router.get('/:spotId', async(req,res) => {
    const {spotId} = req.params;
    const result = await Review.findByPk(spotId);
    res.status(200).json(result);
});
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
    }else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
});
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
