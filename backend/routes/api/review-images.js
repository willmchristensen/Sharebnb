const express = require('express');
const { ReviewImage } = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// TODO: implement owner scope
// Delete a Review Image
router.delete('/:reviewImageId',requireAuth,handleValidationErrors, async(req,res) => {
    const {reviewImageId} = req.params;
    const reviewImage = await ReviewImage.findByPk(reviewImageId);

    if(reviewImage){
        await reviewImage.destroy()
        res.status(200).json({message: "Successfully deleted"});
    }else{
        res.status(404).json({message: "ReviewImage couldn't be found"})
    }
});
module.exports = router;
