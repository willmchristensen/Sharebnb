const express = require('express');
const { ReviewImage } = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// Delete a Spot Image
router.delete('/:reviewImageId',requireAuth,handleValidationErrors, async(req,res) => {
    // TODO:
    // implement owner scope
    const {reviewImageId} = req.params;
    const result = await ReviewImage.findByPk(reviewImageId);
    if(result){
        await result.destroy()
        res.status(200).json({message: "Successfully deleted"});
    }else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
});
module.exports = router;
