import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { loadUserBookings, getAllBookings } from '../../store/bookings'; // Import loadUserBookings
import ManageButtons from '../ManageButtons';
import SpotCards from '../SpotCards';

const ManageBookings = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userBookings = useSelector(state => state.bookings.user); 
  const userBookingsArray = Object.values(userBookings);
  const today = new Date();
  let futureBookings = userBookingsArray.filter(b => {
    let start = new Date(b.startDate);
    return start > today;
  });
  useEffect(() => {
    dispatch(getAllSpots());
    dispatch(loadUserBookings()); 
  }, [dispatch, sessionUser]);
  return (
    <main>
      <div className="manage-wrapper">
        <nav className="spot-cards-section">
          <div className="spot-cards-section-header">
            <h3>Manage Your Bookings</h3>
          </div>
          {futureBookings.map(booking => (
            <div key={booking.id}>
              <h3>Start: {booking.startDate}</h3>
              <h3>End: {booking.endDate}</h3>
              <SpotCards spot={booking.Spot} className="spot-card" />
              <ManageButtons booking={booking} />
            </div>
          ))}
        </nav>
      </div>
    </main>
  );
};

export default ManageBookings;
