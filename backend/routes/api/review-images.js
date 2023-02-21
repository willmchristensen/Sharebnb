const express = require('express');
const { ReviewImage, Review} = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// TODO: (?implement owner scope?) && (refactor)
// Delete a Review Image
router.delete('/:reviewImageId',requireAuth,handleValidationErrors, async(req,res) => {
    const {reviewImageId} = req.params;
    const reviewImage = await ReviewImage.findByPk(reviewImageId);
    const review = await Review.findByPk(reviewImage.reviewId);
    let ownerId = review.userId;
    if(reviewImage){
        if(req.user.id === ownerId){
            await reviewImage.destroy()
            res.status(200).json({message: "Successfully deleted"});
        }else{
            res.status(400).json({message: "Review must belong to the current user"});
        }
    }else{
        res.status(404).json({message: "ReviewImage couldn't be found"})
    }
});
module.exports = router;
