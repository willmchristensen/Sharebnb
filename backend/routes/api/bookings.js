const express = require('express');
const { Booking , Spot} = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();

// Get Bookings of Current User
router.get('/current',requireAuth,handleValidationErrors, async(req,res) => {
    let User = req.user;
    let Bookings = await Booking.findAll({
        where: {
            userId: User.id
        },
        include: {
            model: Spot,
        }
    })
    if(Bookings){
        res.status(200).json(Bookings);
    }else{
        res.status(400).json({message: "Booking couldn't be found"});
    }
});


// Edit a booking by ID
router.put('/:bookingId',requireAuth,handleValidationErrors, async(req,res) => {
    const {bookingId} = req.params;
    const result = await Booking.findByPk(bookingId);
    if(result){
        const {startDate,endDate} = req.body;
        // result.spotId = result.spotId;
        result.userId = req.user.id;
        result.startDate = startDate;
        result.endDate = endDate;
        await result.save();
        res.status(200).json(result);
    }else{
        res.status(404).json({message: "Spot couldn't be found"})
    }
});
// ----------------------------------------------------------------------------------------
// TODO: Error response with status 400 is given when it is past the booking's
//       startDate (no deleting of current or past bookings)
// -----------------------------------------------------------------------------------------
// Delete a Booking
router.delete('/:bookingId',requireAuth,handleValidationErrors, async(req,res) => {
    const {bookingId} = req.params;
    const result = await Booking.findByPk(bookingId);
    if(result){
        await result.destroy()
        res.status(200).json({message: "Successfully deleted"});
    }else{
        res.status(404).json({message: "Booking couldn't be found"})
    }
});
module.exports = router;
