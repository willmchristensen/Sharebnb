import './UpdateBookingModal.css'
import { useState  } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editBooking } from '../../store/bookings';

function BookingModal({ booking }) {
  let dispatch = useDispatch();
  let history = useHistory();
  const start = new Date(booking && booking.startDate);
  const end = new Date(booking && booking.endDate);
  const formFriendlyStart = start.toISOString().split('T')[0];
  const formFriendlyEnd = end.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(booking && formFriendlyStart);
  const [endDate, setEndDate] = useState(booking && formFriendlyEnd);

  const onSubmit = async (e) => {
    e.preventDefault();
    const vals = {
      startDate,
      endDate
    };
    const id = booking && booking.id;
    const payload = { id: id, data: vals }
    window.alert(`${payload.id}, ${payload.data.startDate},${payload.data.endDate}`)
    history.push('/bookings/current');
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
                {/* {isSubmitted && <span className="errors">{errors.address}</span>} */}
              </div>
              <input
                type="date"
                name="country"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
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
                {/* {isSubmitted && <span className="errors">{errors.address}</span>} */}
              </div>
              <input
                type="date"
                name="country"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                placeholder="Address"
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
        // disabled={Boolean(Object.keys(errors).length) || Boolean(Object.keys(imageErrors).length)}
          className='update-booking-button'
        >
          Update Your Booking
        </button>
      </div>
    </form>
  );
}

export default BookingModal;
