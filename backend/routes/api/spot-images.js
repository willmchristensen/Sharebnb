const express = require('express');
const { SpotImage } = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// TODO: double check everything
// Delete a Spot Image
router.delete('/:spotImageId',requireAuth,handleValidationErrors, async(req,res) => {
    const {spotImageId} = req.params;
    const result = await SpotImage.findByPk(spotImageId);
    if(result){
        await result.destroy()
        res.status(200).json({message: "Successfully deleted"});
    }else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
});
module.exports = router;
