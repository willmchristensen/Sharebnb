import './UpdateBookingModal.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editBooking } from '../../store/bookings';
import { useModal } from '../../context/Modal';
import { loadUserBookings } from '../../store/bookings';

function BookingModal({ booking }) {
  let dispatch = useDispatch();
  let history = useHistory();
  const start = new Date(booking && booking.startDate);
  const end = new Date(booking && booking.endDate);
  const formFriendlyStart = start.toISOString().split('T')[0];
  const formFriendlyEnd = end.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(booking && formFriendlyStart);
  const [endDate, setEndDate] = useState(booking && formFriendlyEnd);
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const {closeModal} = useModal();

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const vals = {
      startDate,
      endDate
    };
    const id = booking && booking.id;
    const payload = { id: id, data: vals }
    const res = await dispatch(editBooking(payload))
    if(res.errors){
      setErrors(res.errors);
      setIsDisabled(true);
    }else{
      await dispatch(loadUserBookings()).then(closeModal())
    }
  }

  return (
    <form
      className="update-booking-form"
      onSubmit={onSubmit}
    >
      <div className="update-booking-container">
        <div className="form-row">
          <div className="form-row-data">
            <label>
              <div className="form-row-data-label">
                <span>Start Date</span>
              </div>
              <span className="errors">{startDateError}</span>
              <input
                type="date"
                name="country"
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="Address"
              />
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row-data">
            <label>
              <div className="form-row-data-label">
                <span>End Date</span>
              </div>
              <span className="errors">{endDateError}</span>
              <input
                type="date"
                name="country"
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="Address"
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className='update-booking-button'
          disabled={isDisabled}
        >
          Update Your Booking
        </button>
      </div>
    </form>
  );
}

export default BookingModal;
