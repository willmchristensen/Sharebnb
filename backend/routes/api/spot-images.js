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

    const result = await SpotImage.findByPk(spotImageId);
    const spot = await Spot.findByPk(result.spotId);

    let spotOwner = spot.ownerId;
    // return res.json({spotOwner,userId,spot,result})
    if(spotOwner !== userId){
        return res.status(404).json({message: "Spot Image couldn't be found"})
    }
    if(result){
        await result.destroy()
        return res.status(200).json({message: "Successfully deleted"});
    }else{
        return res.status(404).json({message: "Spot Image couldn't be found"})
    }
});
module.exports = router;
