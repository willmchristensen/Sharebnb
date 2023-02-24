const express = require('express');
const { ReviewImage, Review} = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// TODO: DOUBLE CHECK EVERYTHING
// Delete a Review Image
router.delete('/:reviewImageId',requireAuth,handleValidationErrors, async(req,res) => {
    const {reviewImageId} = req.params;
    const reviewImage = await ReviewImage.findByPk(reviewImageId);
    if(!reviewImage){
        res.status(404).json({
            message: "ReviewImage couldn't be found",
            statusCode: 404
        });
    }else {
        const review = await Review.findByPk(reviewImage.reviewId);
        if(req.user.id !== review.userId){
            res.status(400).json({
                message: "Review must belong to the current user",
                statusCode: 400
            });
        }else{
            await reviewImage.destroy()
            res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }
    }
});
module.exports = router;
