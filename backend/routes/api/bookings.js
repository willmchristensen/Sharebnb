const express = require('express');
const { Booking , Spot} = require('../../db/models');
const {handleValidationErrors} = require('../../utils/validation');
const { check } = require('express-validator');
const {requireAuth} = require('../../utils/auth');
const router = express.Router();
// Get Bookings of Current User
router.get('/current',requireAuth, async(req,res) => {
    let User = req.user;
    console.log('------------------------------User in backend',User);
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
const validateBooking = [
    check('startDate')
        .exists({checkFalsy: true})
        .withMessage("StartDate is required"),
    check('endDate')
        .exists({checkFalsy: true})
        .withMessage("EndDate is required"),
    handleValidationErrors
];
router.get('/all', requireAuth, async (req, res) => {
    try {
      // Fetch all bookings and include the associated spots
      // const Bookings = await Booking.findAll({
      //   include: [
      //     {
      //       model: Spot,
      //       attributes: {
      //         exclude: [
      //           'description',
      //           'avgRating',
      //           'createdAt',
      //           'updatedAt'
      //         ]
      //       }
      //     }
      //   ]
      // });
      const Bookings = await Booking.findAll({
        include: [Spot], // Include the Spot model in the query
      });
      return res.status(200).json({ Bookings });
    } catch (error) {
      console.error('Error fetching all bookings:', error);
      return res.status(500).json({
        error: 'Internal server error'
      });
    }
  });
// Create a booking
// router.post('/', requireAuth,validateBooking, async (req, res) => {
//     const { spotId, startDate, endDate } = req.body;
//     try {
//         const newBooking = await Booking.create(
//           {
//             spotId,
//             startDate,
//             endDate,
//             userId: req.user.id
//           },
//           {
//             include: [
//               {
//                   model: Spot, attributes: {
//                       exclude:
//                       [
//                           "description",
//                           "avgRating",
//                           "createdAt",
//                           "updatedAt"
//                       ]
//                   }
//               },
//           ]
//           }
//         );

//         return res.status(201).json(newBooking);
//     } catch (error) {
//         console.error('Error creating booking:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });
router.post('/', requireAuth, validateBooking, async (req, res) => {
    const { spotId, startDate, endDate } = req.body;

    try {
        // Validate start and end dates vs today
        const today = new Date().getTime();
        const startTime = new Date(startDate).getTime();
        const endTime = new Date(endDate).getTime();
        if (startTime <= today || endTime <= today) {
            return res.status(400).json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    startDate: "Start date or end date cannot be in the past or today"
                }
            });
        }
        // Validate start and end dates vs eachother
        const errors = {};
        if (endTime <= startTime) {
            return res.status(400).json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate: "endDate cannot be on or before startDate"
                }
            });
        } else {
            // Check for conflicts with existing bookings
            const bookings = await Booking.findAll({ where: { spotId: spotId } });
            for (let i = 0; i < bookings.length; i++) {
                let existingBooking = bookings[i];
                let start = existingBooking.startDate;
                let end = existingBooking.endDate;
                let scheduledStart = new Date(start).getTime();
                let scheduledEnd = new Date(end).getTime();

                let startConflict = startTime >= scheduledStart && startTime <= scheduledEnd;
                let endConflict = endTime >= scheduledStart && endTime <= scheduledEnd;

                if (startConflict) errors.startDate = "Start date conflicts with an existing booking";
                if (endConflict) errors.endDate = "End date conflicts with an existing booking";
            }
            if (Object.keys(errors).length) {
                console.log('------------------------------errors in route: ', errors);
                return res.status(403).json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    statusCode: 403,
                    errors
                });
            } else {
                // Create the new booking
                const newBooking = await Booking.create({
                    spotId,
                    startDate,
                    endDate,
                    userId: req.user.id
                });

                return res.status(201).json(newBooking);
            }
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Edit a booking by ID
router.put('/:bookingId',requireAuth,validateBooking, async(req,res) => {
    const booking = await Booking.findOne({
        where: {
            id: req.params.bookingId,
        }
    });
    // console.log('------------------------------booking in backend', booking);
    console.log('------------------------------req.user', req.user.id);
    console.log('------------------------------booking.userId', booking.userId);
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
