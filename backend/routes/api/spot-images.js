const express = require('express');
const { SpotImage, User, Spot } = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// TODO: double check everything
// Delete a Spot Image
router.delete('/:spotImageId',requireAuth,handleValidationErrors, async(req,res) => {
    const {spotImageId} = req.params;
    const userId = req.user.id;

    const spotImage = await SpotImage.findByPk(spotImageId);
    if(!spotImage){
        return res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        });
    }else{
        const spot = await Spot.findByPk(spotImage.spotId);
        if(spot.ownerId !== userId){
            return res.status(403).json({
                message: "Spot must belong to the current user",
                statusCode: 403
            });
        }else{
            await spotImage.destroy()
            return res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }
    }
});
module.exports = router;
