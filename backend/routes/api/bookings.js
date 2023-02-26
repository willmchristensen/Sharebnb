const express = require('express');
const { Booking , Spot} = require('../../db/models');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// TODO: DOUBLE CHECK EVERYTHING
// Get Bookings of Current User
router.get('/current',requireAuth, async(req,res) => {
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
        return res.status(200).json({Bookings});
    }else{
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
    });
    }
});
// TODO: DOUBLE CHECK EVERYTHING
// Edit a booking by ID
router.put('/:bookingId',requireAuth, async(req,res) => {
    const booking = await Booking.findOne({
        where: {
            id: req.params.bookingId,
        }
    });
    if(!booking){
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }else if(booking.userId !== req.user.id){
        return res.status(403).json({
            message: "Booking must belong to the current user",
            statusCode: 403
        });
    }else {
        let today = new Date().getTime();
        let end = booking.endDate;
        let endTime = new Date(end).getTime();
        if(today > endTime){
            return res.status(403).json({
                message: "Past bookings can't be modified",
                statusCode: 403
            });
        }else {
            let {startDate,endDate} = req.body;

            let startTime = new Date(startDate).getTime();
            let endTime = new Date(endDate).getTime();

            let errors = {};

            if(endTime < startTime){
                return res.status(400).json({
                    message: "Validation error",
                    statusCode: 400,
                    errors: {
                      endDate: "endDate cannot be on or before startDate"
                    }
                  });
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

                    if(startConflict) errors.startDate = "Start date conflicts with an existing booking"
                    if(endConflict) errors.endDate = "End date conflicts with an existing booking"

                }

                if(Object.keys(errors).length){
                    return res.status(403).json({
                        message: "Sorry, this spot is already booked for the specified dates",
                        statusCode: 403,
                        errors
                    });
                }else{
                    booking.spotId = booking.spotId;
                    booking.userId = req.user.id;
                    booking.startDate = startDate;
                    booking.endDate = endDate;
                    await booking.save();

                    return res.status(200).json(booking);
                }

            }
        }
    }
});
// TODO: DOUBLE CHECK EVERYTHING
// Delete a Booking
router.delete('/:bookingId',requireAuth, async(req,res) => {
    const {bookingId} = req.params;
    const booking = await Booking.findByPk(bookingId);

    if(!booking){
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    }else if(booking.userId !== req.user.id){
        return res.status(403).json({
            message: "Booking must belong to the current user",
            statusCode: 403
        });
    }else{
        let start = booking.startDate;
        let startInt = new Date(start).getTime();
        let todayInt = new Date().getTime();
        let inValidDelete = !(todayInt < startInt);
        if(inValidDelete){
            return res.status(403).json({
                message: "Bookings that have been started can't be deleted",
                statusCode: 403
            });
        }else if(booking){
            await booking.destroy()
            return res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }
    }
});
module.exports = router;
