const express = require('express');
const { Booking , Spot} = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const moment = require('moment');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// ----------------------------------------------------------------------------------------
// TODO: DOUBLE CHECK EVERYTHING
// -----------------------------------------------------------------------------------------
// Get Bookings of Current User
router.get('/current',requireAuth,handleValidationErrors, async(req,res) => {
    let User = req.user;
    let Bookings = await Booking.findAll({
        where: {
            userId: User.id
        },
        include: [
            {
                model: Spot, attributes: {
                    exclude:
                    [
                        "description",
                        "avgRating",
                        "createdAt",
                        "updatedAt"
                    ]
                }
            },
        ]
    });
    if(Bookings){
        res.status(200).json({Bookings});
    }else{
        res.status(400).json({message: "Booking couldn't be found"});
    }
});
// ----------------------------------------------------------------------------------------
// TODO: DOUBLE CHECK EVERYTHING
// -----------------------------------------------------------------------------------------
// Edit a booking by ID
router.put('/:bookingId',requireAuth,handleValidationErrors, async(req,res) => {
    const booking = await Booking.findOne({
        where: {
            id: req.params.bookingId,
            userId: req.user.id,
        }
    });
    if(!booking){
        return res.status(404).json({message: "Booking couldn't be found"})
    }else {
        let today = new Date().getTime();
        let end = booking.endDate;
        let endTime = new Date(end).getTime();
        if(today > endTime){
            return res.status(403).json({message: "Past bookings can't be modified"});
        }else {
            let {startDate,endDate} = req.body;

            let startTime = new Date(startDate).getTime();
            let endTime = new Date(endDate).getTime();

            if(endTime < startTime){
                return res.status(400).json({message: "endDate cannot be on or before startDate"});
            }else{
                const bookings = await Booking.findAll({where:{spotId: booking.spotId,}});
                for(let i = 0; i < bookings.length; i++){

                    let booking = bookings[i];
                    let start = booking.startDate;
                    let end = booking.endDate;
                    let scheduledStart = new Date(start).getTime();
                    let scheduledEnd = new Date(end).getTime();

                    let startConflict = startTime >= scheduledStart && startTime <= scheduledEnd;
                    let endConflict = endTime >= scheduledStart && endTime <= scheduledEnd;

                    if(startConflict){
                        return res.status(403).json({
                            message: "Sorry, this spot is already booked for the specified dates",
                            errors:"Start date conflicts with an existing booking"
                        });
                    }else if(endConflict){
                        return res.status(403).json({
                            message: "Sorry, this spot is already booked for the specified dates",
                            errors:"End date conflicts with an existing booking"
                        });
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
            return res.status(200).json({message: "Successfully deleted"});
        }else{
            return res.status(404).json({message: "Booking couldn't be found"});
        }
    }

});
module.exports = router;
