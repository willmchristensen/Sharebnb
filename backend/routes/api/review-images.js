const express = require('express');
const { ReviewImage, Review} = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// TODO: DOUBLE CHECK EVERYTHING
// Delete a Review Image
router.delete('/:reviewImageId',requireAuth, async(req,res) => {
    const {reviewImageId} = req.params;
    const reviewImage = await ReviewImage.findByPk(reviewImageId);
    if(!reviewImage){
        return res.status(404).json({
            message: "Review Image couldn't be found",
            statusCode: 404
        });
    }else {
        const review = await Review.findOne({where: {
            id: reviewImage.reviewId,
            userId: req.user.id
        }});
        if(!review){
            return res.status(403).json({
                message: "Review must belong to the current user",
                statusCode: 403
            });
        }else{
            await reviewImage.destroy()
            return res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }
    }
});
module.exports = router;
