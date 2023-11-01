import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOneBooking } from '../../store/bookings';

const SpotReservation = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    let today = new Date()
    // const formFriendlyDate = today.toISOString().split('T')[0];
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});
    // const [isSubmitted, setIsSubmitted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const onSubmit = async (e) => {
        e.preventDefault();
        let realSpotId = parseInt(spotId);
        const payload = { 'spotId': realSpotId, 'startDate': startDate, 'endDate': endDate };
        const res = await dispatch(createOneBooking(payload));
        if(!res.errors) {
            history.push('/bookings/current');
        }else{
            setErrors(res.errors)            
        }
    };

    const handleStartDateChange = (event) => {
        const selectedStartDate = new Date(event.target.value);
        const today = new Date();
        const selectedEndDate = new Date(endDate)
        // if start date is a number and greater than today
        if (!isNaN(selectedStartDate) && selectedStartDate > today) {
            if (!isNaN(selectedEndDate) && selectedEndDate > today && selectedEndDate > selectedStartDate) {
                // Valid start date and end date
                setErrors({});
                setStartDate(event.target.value);
                setIsDisabled(false);
            } else {
                // Valid start date but invalid end date
                setStartDate(event.target.value);
                setErrors({ endDate: 'Invalid end date, end date must be after the start date and today.' });
                setIsDisabled(true);
            }
        } else {
            // Invalid start date
            setStartDate(event.target.value);
            setErrors({ startDate: 'Invalid start date, start date must be a valid date and after today.' });
            setIsDisabled(true);
        }
    };
    
    const handleEndDateChange = (event) => {
        const selectedEndDate = new Date(event.target.value);
        const today = new Date();
        const selectedStartDate = new Date(startDate);
        // if end date is a number and greater than today
        if (!isNaN(selectedEndDate) && selectedEndDate > today) {
            if (!isNaN(selectedStartDate) && selectedStartDate > today && selectedStartDate < selectedEndDate) {
                // Valid end date and start date
                setErrors({});
                setEndDate(event.target.value);
                setIsDisabled(false);
            } else {
                // Valid end date but invalid start date
                setEndDate(event.target.value);
                setErrors({ startDate: 'Invalid start date, start date must be before the end date and after today.' });
                setIsDisabled(true);
            }
        } else {
            // Invalid end date
            setEndDate(event.target.value);
            setErrors({ endDate: 'Invalid end date, end date must be a valid date and after today.' });
            setIsDisabled(true);
        }
    };
    

    const startDateError = errors.startDate ? (
        <div className="error-message">{errors.startDate}</div>
    ) : null;

    const endDateError = errors.endDate ? (
        <div className="error-message">{errors.endDate}</div>
    ) : null;

    return (
        <form className="create-spot-form" onSubmit={onSubmit}>
            <div className="user-information-create-spot">
                <div className="form-section one">
                    <div className="form-row">
                        <div
                            className="form-row-data"
                            id="top"
                        >
                            <h1>Create a New Booking</h1>
                            <h2 id="subtitle">
                                Start Date
                            </h2>
                            <p>
                                Start date must be after today
                            </p>
                            <input
                                type="date"
                                name="start-date"
                                id="start-date-form-data"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                            <span className="errors">
                                {startDateError}
                            </span>
                        </div>
                        <h2 id="subtitle">
                            End Date
                        </h2>
                        <p>
                            End date must be after today
                        </p>
                        <input
                            type="date"
                            name="end-date"
                            id="end-date-form-data"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                        <span className="errors">
                            {endDateError}
                        </span>
                    </div>
                    <button
                        type="submit"
                        id="manage"
                        disabled={isDisabled}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SpotReservation;
