const express = require('express');
const { Booking , Spot} = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const moment = require('moment');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// TODO: DOUBLE CHECK EVERYTHING
// Get Bookings of Current User
router.get('/current',requireAuth,handleValidationErrors, async(req,res) => {
    let User = req.user;
    let Bookings = await Booking.findAll({
        where: {
            userId: User.id
        },
        include: [
            {model: Spot, attributes: {
                exclude: [ "description",
                "avgRating",
                "createdAt",
                "updatedAt"]
            }},
        ]
    })
    if(Bookings){
        res.status(200).json({Bookings});
    }else{
        res.status(400).json({message: "Booking couldn't be found"});
    }
});

// TODO: DOUBLE CHECK EVERYTHING
// Edit a booking by ID
router.put('/:bookingId',requireAuth,handleValidationErrors, async(req,res) => {
    // if(result){
    //     const {startDate,endDate} = req.body;

    // }else{
    //     res.status(404).json({message: "Spot couldn't be found"})
    // }
    const {bookingId} = req.params;
    const booking = await Booking.findByPk(bookingId);

    let today = new Date().getTime();

    let end = booking.endDate;
    // return res.json(end);
    let endTime = new Date(end).getTime();
    // return res.json({end,today, endTime})

    if(!booking){
        return res.status(404).json({message: "Booking couldn't be found"})
    }else if(today > endTime){
        return res.status(403).json({message: "Past bookings can't be modified"});
    }else {
        let {startDate,endDate} = req.body;

        let startTime = new Date(startDate).getTime();
        let endTime = new Date(endDate).getTime();

        if(endTime < startTime){
            return res.status(400).json({message: "endDate cannot be on or before startDate"});
        }else{

            const bookings = await Booking.findAll({
                where:{
                    spotId: booking.spotId,
                }
            });

            for(let i = 0; i < bookings.length; i++){
                let booking = bookings[i];
                let start = booking.startDate;
                let end = booking.endDate;
                let scheduledStart = new Date(start).getTime();
                let scheduledEnd = new Date(end).getTime();


                let booked = ((startTime >= scheduledStart || startTime <= scheduledEnd) || (endTime >= scheduledStart || endTime <= scheduledEnd))
                if(booked){
                    return res.status(403).json({message: "Sorry, this spot is already booked for the specified dates"});
                }
            }

            booking.spotId = booking.spotId;
            booking.userId = req.user.id;
            booking.startDate = startDate;
            booking.endDate = endDate;
            await booking.save();

            return res.status(200).json(booking);
        }

    }
});
// ----------------------------------------------------------------------------------------
// TODO: DOUBLE CHECK EVERYTHING
// -----------------------------------------------------------------------------------------
// Delete a Booking
router.delete('/:bookingId',requireAuth,handleValidationErrors, async(req,res) => {
    const {bookingId} = req.params;
    const result = await Booking.findByPk(bookingId);

    if(result.startDate){
        let start = result.startDate;
        let startInt = new Date(start).getTime();
        let todayInt = new Date().getTime();
        let inValidDelete = !(todayInt < startInt);
        if(inValidDelete){
            return res.status(403).json({message: "Bookings that have been started can't be deleted"});
        }else if(result){
            await result.destroy()
            res.status(200).json({message: "Successfully deleted"});
        }else{
            res.status(404).json({message: "Booking couldn't be found"})
        }
    }

});
module.exports = router;
